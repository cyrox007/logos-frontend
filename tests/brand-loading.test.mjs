import test from 'node:test';
import assert from 'node:assert/strict';
import { createBrandLoadingController } from '../src/domain/brand-loading.mjs';

function createHarness() {
    const callbacks = new Map();
    const delays = [];
    const visibility = [];
    let nextId = 1;
    const controller = createBrandLoadingController({
        schedule(fn, delay) {
            const id = nextId++;
            callbacks.set(id, fn);
            delays.push(delay);
            return id;
        },
        cancel(id) {
            callbacks.delete(id);
        },
        notify(value) {
            visibility.push(value);
        }
    });
    function completePending() {
        for (const [id, callback] of [...callbacks]) {
            callbacks.delete(id);
            callback();
        }
    }
    return { controller, callbacks, visibility, delays, completePending };
}

test('Первый запрос показывает фирменную заставку только при длительном ожидании', () => {
    const h = createHarness();
    h.controller.start('/');
    assert.deepEqual(h.delays, [380]);
    assert.deepEqual(h.visibility, []);
    h.completePending();
    assert.deepEqual(h.visibility, [true]);
    h.controller.finish('/');
    assert.deepEqual(h.visibility, [true, false]);
});

test('Быстрый ответ не задерживается заставкой', () => {
    const h = createHarness();
    h.controller.start('/catalog');
    h.controller.finish('/catalog');
    assert.equal(h.callbacks.size, 0);
    assert.deepEqual(h.visibility, []);
    h.controller.start('/catalog/history');
    assert.deepEqual(h.delays, [380, 1400]);
});

test('При смене маршрута старый таймер прекращает работу', () => {
    const h = createHarness();
    h.controller.start('/catalog/old');
    h.controller.navigate('/catalog/new');
    h.completePending();
    h.controller.finish('/catalog/old');
    assert.deepEqual(h.visibility, []);
    h.controller.start('/catalog/new');
    assert.deepEqual(h.delays, [380, 1400]);
});

test('Повторная загрузка не держит заставку дольше реального запроса', () => {
    const h = createHarness();
    h.controller.start('/catalog');
    h.controller.finish('/catalog');
    h.controller.start('/catalog');
    h.completePending();
    assert.deepEqual(h.visibility, [true]);
    h.controller.finish('/catalog');
    assert.deepEqual(h.visibility, [true, false]);
    h.controller.dispose();
    assert.equal(h.callbacks.size, 0);
});
