<template>
    <main class="catalog-page">
        <div class="container">
            <nav class="breadcrumbs" aria-label="Навигационная цепочка">
                <router-link :to="{ name: 'home' }">Главная</router-link>
                <span class="breadcrumbs__separator" aria-hidden="true">/</span>
                <span aria-current="page">Каталог знаний</span>
            </nav>
            <header class="catalog-page__header">
                <div>
                    <span class="eyebrow">Темы и направления</span>
                    <h1>Каталог <em>знаний</em></h1>
                    <p>Выберите рубрику для знакомства с материалами, исследованиями и источниками. Содержание каталога формируется в общей системе публикаций.</p>
                </div>
                <span class="catalog-page__symbol" aria-hidden="true">λόγος</span>
            </header>

            <div class="catalog-page__toolbar">
                <div>
                    <h2>Все рубрики</h2>
                    <p v-if="!isLoading && !error" class="catalog-page__count">{{ categories.length }} {{ rubricWord(categories.length) }}</p>
                </div>
                <label class="search-field">
                    <span aria-hidden="true">⌕</span>
                    <input v-model.trim="query" type="search" placeholder="Найти рубрику..." aria-label="Поиск по рубрикам">
                </label>
            </div>

            <div v-if="isLoading" class="state-card" role="status">Загружаем рубрики…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">{{ error }}</div>
            <div v-else-if="filteredCategories.length" class="catalog-page__grid">
                <CategoryArticles :categories="filteredCategories" />
            </div>
            <div v-else-if="query" class="state-card">По запросу «{{ query }}» рубрики не найдены. Попробуйте другое слово.</div>
            <div v-else class="state-card">Пока нет опубликованных рубрик.</div>
        </div>
    </main>
</template>

<script>
import CategoryArticles from '@/components/Articles/CategoryArticles.vue';
import PublicContentService from '@/API/PublicContentService';
import { applyCatalogSeo } from '@/seo';

export default {
    name: 'LecturePage',
    components: { CategoryArticles },
    data() {
        return { isLoading: true, error: '', categories: [], query: '' };
    },
    computed: {
        filteredCategories() {
            const term = this.query.toLocaleLowerCase('ru-RU');
            if (!term) return this.categories;
            return this.categories.filter(category =>
                [category.title, category.description].some(value =>
                    String(value || '').toLocaleLowerCase('ru-RU').includes(term)
                )
            );
        }
    },
    async created() {
        applyCatalogSeo();
        try {
            const response = await PublicContentService.getCategories();
            this.categories = response.data.items || [];
        } catch (error) {
            console.error(error);
            this.error = 'Не удалось загрузить рубрики. Попробуйте обновить страницу.';
        } finally {
            this.isLoading = false;
        }
    },
    methods: {
        rubricWord(count) {
            if (count % 10 === 1 && count % 100 !== 11) return 'рубрика';
            if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14)) return 'рубрики';
            return 'рубрик';
        }
    }
};
</script>

<style>
.catalog-page { padding: 48px 0 105px; }
.catalog-page__header { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 45px; min-height: 315px; margin-bottom: 58px; padding: clamp(30px,5vw,68px); overflow: hidden; border: 1px solid #c8deca; border-radius: 15px; background: linear-gradient(120deg, #e9f6e9, #f9fcf7 75%); }
.catalog-page__header > div { position: relative; z-index: 1; max-width: 700px; }
.catalog-page__header h1 { margin: 18px 0; font-size: clamp(48px,6vw,77px); letter-spacing: -.055em; line-height: 1.06; }
.catalog-page__header h1 em { color: var(--color-accent); font-weight: 400; }
.catalog-page__header p { max-width: 680px; color: var(--color-text-muted); font-size: 17px; }
.catalog-page__symbol { position: absolute; right: -18px; bottom: -55px; color: rgba(38,127,93,.07); font: italic 215px var(--font-display); pointer-events: none; }
.catalog-page__toolbar { display: flex; justify-content: space-between; align-items: center; gap: 25px; margin-bottom: 24px; }
.catalog-page__toolbar h2 { font-size: 34px; }
.catalog-page__count { color: var(--color-text-muted); font-size: 13px; }
.catalog-page__grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
@media (max-width: 900px) { .catalog-page__grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
@media (max-width: 620px) { .catalog-page { padding: 30px 0 72px; } .catalog-page__header { min-height: 260px; margin-bottom: 36px; padding: 28px; } .catalog-page__header h1 { font-size: 50px; } .catalog-page__header p { font-size: 15px; } .catalog-page__toolbar { align-items: stretch; flex-direction: column; } .catalog-page__grid { grid-template-columns: 1fr; } }
</style>
