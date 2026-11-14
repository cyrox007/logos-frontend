import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

const pages = [
    'src/pages/CatalogPage.vue',
    'src/pages/CategoryPage.vue',
    'src/pages/PublicationPage.vue'
];
const sections = ['src/components/home/HomeCategories.vue', 'src/components/home/HomeLatest.vue'];

test('Все асинхронные страницы и секции имеют загрузку, ошибку и пустое состояние', () => {
    for (const file of [...pages, ...sections]) {
        const source = read(file);
        assert.match(source, /<LoadingSkeleton/);
        assert.match(source, /<AsyncState/);
        assert.match(source, /<Transition name="content-switch" mode="out-in"/);
        assert.match(source, /action-label="Повторить"|:action-label="/);
    }
});

test('Поиск содержит понятное пустое состояние и возможность сброса', () => {
    for (const file of pages.slice(0, 2)) {
        const source = read(file);
        assert.match(source, /key="search-empty"/);
        assert.match(source, /action-label="Сбросить поиск"/);
        assert.match(source, /@action="query = ''"/);
    }
});

test('Переходы маршрутов и изменения списков анимируются без выдуманных данных', () => {
    assert.match(read('src/App.vue'), /<Transition name="page-fade" mode="out-in"/);
    assert.match(read('src/App.vue'), /:key="route.path"/);
    for (const file of [
        'src/components/knowledge/CategoryArticles.vue',
        'src/components/knowledge/ArticleElement.vue',
        'src/components/knowledge/LastArticles.vue'
    ]) {
        assert.match(read(file), /<TransitionGroup\\b[\\s\\S]*?name="card-list"/);
    }
    assert.match(read('src/components/layout/SiteHeader.vue'), /<Transition name="mobile-menu"/);
    assert.match(read('src/components/ui/SearchField.vue'), /name="search-clear"/);
});

test('Учитываются доступность и отказ от анимации', () => {
    const skeleton = read('src/components/ui/LoadingSkeleton.vue');
    assert.match(skeleton, /role="status"/);
    assert.match(skeleton, /aria-busy="true"/);
    const styles = read('src/styles/states.css');
    assert.match(styles, /prefers-reduced-motion: reduce/);
    assert.match(read('src/styles/base.css'), /prefers-reduced-motion: reduce/);
    assert.match(read('src/pages/PublicationPage.vue'), /@after-enter="buildToc"/);
});
