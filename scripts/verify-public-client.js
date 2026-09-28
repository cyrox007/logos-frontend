const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const absent = relative => !fs.existsSync(path.join(root, relative));

const checks = [
    [
        'маршрутизатор содержит только публичные маршруты',
        () => {
            const router = read('src/router/index.js');
            return !router.includes('/login')
                && !router.includes('/registration')
                && !router.includes('/panel/')
                && !router.includes('/profile');
        }
    ],
    [
        'старые страницы авторизации и CMS удалены',
        () => [
            'src/pages/LoginPage.vue',
            'src/pages/RegistrationPage.vue',
            'src/pages/CreateArticlePage.vue',
            'src/pages/UpdateArticlePage.vue',
            'src/pages/ProfilePage.vue',
            'src/API/AuthService.js',
            'src/store/index.js',
            'src/utils/hashMethods.js'
        ].every(absent)
    ],
    [
        'зависимости старой CMS удалены',
        () => {
            const pkg = JSON.parse(read('package.json'));
            const dependencies = pkg.dependencies || {};
            return [
                '@editorjs/editorjs',
                'crypto-js',
                'vuex'
            ].every(name => !(name in dependencies));
        }
    ],
    [
        'клиент проверяет версию публичного API',
        () => {
            const api = read('src/API/PublicContentService.js');
            return api.includes("EXPECTED_CONTRACT = 'jsint-public-v1'")
                && api.includes("x-jsint-public-api");
        }
    ],
    [
        'страница материала использует структурированный профиль',
        () => {
            const article = read('src/pages/ArticlePage.vue');
            return article.includes('article?.data')
                && article.includes("'logos.article'")
                && article.includes('bibliography');
        }
    ],
    [
        'SEO формируется на стороне Logos',
        () => {
            const seo = read('src/seo/index.js');
            return seo.includes("application/ld+json")
                && seo.includes('profile.abstract')
                && !seo.includes('extra_data');
        }
    ]
];

let failed = 0;
for (const [label, check] of checks) {
    if (check()) {
        process.stdout.write(`✓ ${label}\n`);
        continue;
    }

    process.stderr.write(`✗ ${label}\n`);
    failed += 1;
}

if (failed > 0) {
    process.exit(1);
}

process.stdout.write('Публичный клиент Logos соответствует контракту.\n');
