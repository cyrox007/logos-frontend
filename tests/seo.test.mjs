import test from 'node:test';
import assert from 'node:assert/strict';
import { homeSeo, catalogSeo, categorySeo, articleSeo } from '../src/seo/descriptors.mjs';

const rootUrl = 'https://logos.example/';
const publicationUrl = 'https://logos.example/catalog/history/research';

test('Главная использует URL собственного домена, а не JSInteractive', () => {
    const metadata = homeSeo(rootUrl);
    assert.equal(metadata.url, rootUrl);
    assert.equal(metadata.structuredData['@type'], 'WebSite');
    assert.equal(metadata.structuredData.url, rootUrl);
});

test('У каталога и рубрики разные заголовки и корректные canonical', () => {
    const catalog = catalogSeo(rootUrl + 'catalog');
    const category = categorySeo(
        { title: 'История', description: 'Исследования' },
        rootUrl + 'catalog/history'
    );
    assert.notEqual(catalog.title, category.title);
    assert.equal(category.description, 'Исследования');
    assert.equal(category.structuredData['@type'], 'CollectionPage');
    assert.equal(category.structuredData.url, rootUrl + 'catalog/history');
});

test('Метаданные статьи используют поддерживаемый профиль автора', () => {
    const article = {
        title: 'Исследование',
        excerpt: 'Краткое описание',
        published_at: '2026-11-14T10:00:00Z',
        data: {
            schema: 'logos.article',
            version: 1,
            data: { abstract: 'Аннотация', speaker: 'Автор', keywords: ['история', 'архив'] }
        }
    };
    const metadata = articleSeo(article, publicationUrl, rootUrl);
    assert.equal(metadata.ogType, 'article');
    assert.equal(metadata.description, 'Аннотация');
    assert.equal(metadata.structuredData.author.name, 'Автор');
    assert.equal(metadata.structuredData.keywords, 'история, архив');
    assert.equal(metadata.structuredData.isPartOf.url, rootUrl);
});

test('Неподдерживаемый профиль не попадает в метаданные', () => {
    const article = {
        title: 'Лекция',
        excerpt: 'Описание',
        data: { schema: 'logos.article', version: 2, data: { abstract: 'Чужое поле' } }
    };
    assert.equal(articleSeo(article, publicationUrl, rootUrl).description, 'Описание');
});
