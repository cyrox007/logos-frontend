import test from 'node:test';
import assert from 'node:assert/strict';
import { buildArticleToc } from '../src/domain/toc.mjs';

function heading(tagName, textContent, id = '') {
    return { tagName, textContent, id };
}

function fixture(headings, otherIds = []) {
    return {
        querySelectorAll(selector) {
            return selector === '[id]'
                ? [...headings, ...otherIds].filter(node => node.id)
                : headings;
        }
    };
}

test('Оглавление формируется по H2 и H3 и сохраняет порядок', () => {
    const nodes = [heading('H2', 'История'), heading('H3', 'Источники')];
    assert.deepEqual(buildArticleToc(fixture(nodes)), [
        { id: 'история', title: 'История', level: 2 },
        { id: 'источники', title: 'Источники', level: 3 }
    ]);
});

test('Повторяющиеся заголовки получают уникальные ID', () => {
    const nodes = [heading('H2', 'История'), heading('H2', 'История'), heading('H3', 'История')];
    assert.deepEqual(buildArticleToc(fixture(nodes)).map(item => item.id), [
        'история', 'история-2', 'история-3'
    ]);
});

test('Готовые якоря остаются, занятые ID пропускаются', () => {
    const nodes = [heading('H2', 'Заголовок', 'original'), heading('H3', 'Заголовок')];
    assert.deepEqual(
        buildArticleToc(fixture(nodes, [heading('P', '', 'заголовок')])).map(item => item.id),
        ['original', 'заголовок-2']
    );
});

test('Нет DOM или текста — нет пунктов оглавления', () => {
    assert.deepEqual(buildArticleToc(null), []);
    assert.deepEqual(buildArticleToc(fixture([heading('H2', '   ')])), []);
});
