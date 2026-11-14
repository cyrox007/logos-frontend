const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const exists = relative => fs.existsSync(path.join(root, relative));

const required = [
    "src/pages/HomePage.vue",
    "src/pages/CatalogPage.vue",
    "src/pages/CategoryPage.vue",
    "src/pages/PublicationPage.vue",
    "src/components/layout/SiteHeader.vue",
    "src/components/layout/SiteFooter.vue",
    "src/components/ui/PageBreadcrumbs.vue",
    "src/components/ui/SearchField.vue",
    "src/components/home/HomeHero.vue",
    "src/components/home/HomeCategories.vue",
    "src/components/home/HomeLatest.vue",
    "src/components/home/HomePrinciples.vue",
    "src/components/knowledge/CategoryArticles.vue",
    "src/components/knowledge/ArticleElement.vue",
    "src/components/knowledge/LastArticles.vue",
    "src/components/article/ArticleHeader.vue",
    "src/components/article/ArticleContent.vue",
    "src/components/article/ArticleSources.vue",
    "src/components/article/ArticleAside.vue",
    "src/domain/publication.mjs",
    "src/styles/tokens.css",
    "src/styles/base.css",
    "src/styles/home.css",
    "src/styles/catalog.css",
    "src/styles/category.css",
    "src/styles/article.css"
];

function validateImports() {
    const paths = ['src/main.js', 'src/App.vue', 'src/router/index.js', 'src/seo/index.js', ...required.filter(p => /\.(vue|js|mjs)$/.test(p))];
    return paths.every(source => {
        const content = read(source);
        const imports = [...content.matchAll(/from\s+['"]@\/([^'"]+)['"]/g)].map(match => match[1]);
        return imports.every(name => [
            'src/' + name,
            'src/' + name + '.js',
            'src/' + name + '.vue',
            'src/' + name + '.mjs',
            'src/' + name + '/index.js'
        ].some(exists));
    });
}

const checks = [
    ['сохранена отдельная публичная витрина без авторизации и CMS', () => {
        const router = read('src/router/index.js');
        return !['/login', '/registration', '/panel/', '/profile'].some(x => router.includes(x)) &&
            ['src/pages/LoginPage.vue', 'src/API/AuthService.js', 'src/store/index.js', 'src/API/CategoriesService.js', 'src/components/UI/ContentLoader/index.vue'].every(x => !exists(x));
    }],
    ['все компоненты и уровни иерархии присутствуют', () => required.every(exists)],
    ['все внутренние импорты компонентов разрешаются', validateImports],
    ['публичные маршруты и обратная совместимость сохранены', () => {
        const router = read('src/router/index.js');
        return ["path: '/catalog'", "path: '/catalog/:catName'", "path: '/catalog/:catName/:slug'", "path: '/lecture'"]
            .every(x => router.includes(x))
            && router.includes("name: 'catalog'") && router.includes("name: 'publication'");
    }],
    ['общие визуальные токены вынесены из корневого компонента', () =>
        read('src/styles/tokens.css').includes('--color-accent: #267f5d') &&
        read('src/styles/tokens.css').includes('--color-gold:') &&
        !read('src/App.vue').includes('<style>')],
    ['главная собрана из четырёх секций', () => {
        const home = read('src/pages/HomePage.vue');
        return ['HomeHero', 'HomeCategories', 'HomeLatest', 'HomePrinciples'].every(x => home.includes(x));
    }],
    ['каталог и рубрика используют общие элементы и поиск', () =>
        ['src/pages/CatalogPage.vue', 'src/pages/CategoryPage.vue'].every(p =>
            read(p).includes('<PageBreadcrumbs') && read(p).includes('<SearchField') &&
            read(p).includes('filterByFields'))],
    ['чтение статьи выделено на независимые компоненты', () => {
        const page = read('src/pages/PublicationPage.vue');
        const content = read('src/components/article/ArticleContent.vue');
        return ['ArticleHeader', 'ArticleContent', 'ArticleSources', 'ArticleAside'].every(x => page.includes(x)) &&
            content.includes("querySelectorAll('h2, h3')") && page.includes('buildToc()');
    }],
    ['версионированный профиль и библиография остаются публичными', () => {
        const domain = read('src/domain/publication.mjs');
        const article = read('src/pages/PublicationPage.vue');
        return domain.includes("'logos.article'") && domain.includes("'logos.lecture'") &&
            article.includes('getPublicationProfile') && article.includes('bibliography');
    }],
    ['API-контракт JSInteractive не изменён', () => {
        const api = read('src/API/PublicContentService.js');
        return api.includes("EXPECTED_CONTRACT = 'jsint-public-v1'") &&
            api.includes("x-jsint-public-api") && api.includes('getBootstrap') &&
            api.includes('getCategories') && api.includes('getPublications');
    }],
    ['SEO остаётся частью Logos', () => {
        const seo = read('src/seo/index.js');
        return seo.includes('application/ld+json') &&
            seo.includes('getPublicationProfile') && !seo.includes('extra_data');
    }],
    ['старые зависимости редактора не возвращены', () => {
        const dependencies = JSON.parse(read('package.json')).dependencies || {};
        return ['@editorjs/editorjs', 'crypto-js', 'vuex'].every(name => !(name in dependencies));
    }]
];

let failed = 0;
for (const [title, check] of checks) {
    let passed = false;
    try { passed = check(); } catch (error) { process.stderr.write('Ошибка проверки: ' + error.message + '\n'); }
    process[passed ? 'stdout' : 'stderr'].write((passed ? '✓ ' : '✗ ') + title + '\n');
    if (!passed) failed += 1;
}
if (failed) {
    process.stderr.write('Проверки архитектуры не пройдены: ' + failed + ' из ' + checks.length + '.\n');
    process.exit(1);
}
process.stdout.write('Архитектура публичного клиента Logos проверена: ' + checks.length + ' проверок.\n');
