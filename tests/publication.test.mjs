import test from 'node:test';
import assert from 'node:assert/strict';
import {
    SUPPORTED_PROFILE_SCHEMAS,
    getPublicationProfile,
    filterByFields,
    russianPlural,
    formatPublicationDate,
    estimateReadingMinutes
} from '../src/domain/publication.mjs';

test('Профили статьи и лекции поддерживаются по версии 1', () => {
    assert.deepEqual(SUPPORTED_PROFILE_SCHEMAS, ['logos.article', 'logos.lecture']);
    for (const schema of SUPPORTED_PROFILE_SCHEMAS) {
        const payload = { abstract: 'Аннотация', bibliography: ['Архив'] };
        assert.deepEqual(getPublicationProfile({ data: { schema, version: 1, data: payload } }), payload);
    }
});

test('Неизвестные, пустые и несовместимые профили не раскрываются', () => {
    assert.deepEqual(getPublicationProfile(null), {});
    assert.deepEqual(getPublicationProfile({ data: { schema: 'logos.article', version: 2, data: { secret: 1 } } }), {});
    assert.deepEqual(getPublicationProfile({ data: { schema: 'other', version: 1, data: { secret: 1 } } }), {});
    assert.deepEqual(getPublicationProfile({ data: { schema: 'logos.article', version: 1, data: [] } }), {});
});

test('Поиск по рубрикам нечувствителен к регистру и крайним пробелам', () => {
    const categories = [
        { title: 'История Церкви', description: 'Источники' },
        { title: 'Философия', description: 'Исследования' }
    ];
    assert.deepEqual(filterByFields(categories, '  ИСТОРИЯ ', ['title', 'description']), [categories[0]]);
    assert.deepEqual(filterByFields(categories, 'Исследования', ['title', 'description']), [categories[1]]);
    assert.equal(filterByFields(categories, 'нет', ['title', 'description']).length, 0);
    assert.equal(filterByFields(categories, ' ', ['title', 'description']), categories);
});

test('Поиск корректно обрабатывает отсутствующие значения полей', () => {
    assert.deepEqual(filterByFields([{ title: null }, { title: 'Logos' }], 'logos', ['title', 'excerpt']), [{ title: 'Logos' }]);
});

test('Склонение русских числительных', () => {
    const forms = ['материал', 'материала', 'материалов'];
    for (const [n, expected] of [
        [0, 'материалов'], [1, 'материал'], [2, 'материала'],
        [4, 'материала'], [5, 'материалов'], [11, 'материалов'],
        [12, 'материалов'], [21, 'материал'], [23, 'материала'],
        [25, 'материалов'], [111, 'материалов']
    ]) {
        assert.equal(russianPlural(n, forms), expected, 'Количество: ' + n);
    }
});

test('Дата публикации валидируется и форматируется по-русски', () => {
    assert.equal(formatPublicationDate(''), '');
    assert.equal(formatPublicationDate('не дата'), '');
    assert.match(formatPublicationDate('2026-11-14T12:00:00Z'), /2026/);
});

test('Время чтения оценивается по количеству слов без HTML-тегов', () => {
    assert.equal(estimateReadingMinutes(''), 0);
    assert.equal(estimateReadingMinutes('<p>Один текст</p>'), 1);
    assert.equal(estimateReadingMinutes('<p>' + 'слово '.repeat(361) + '</p>'), 3);
});
