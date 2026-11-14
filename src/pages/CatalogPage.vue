<template>
    <main class="catalog-page">
        <div class="container">
            <PageBreadcrumbs :items="breadcrumbs" />
            <header class="catalog-page__header">
                <div>
                    <span class="eyebrow">Темы и направления</span>
                    <h1>Каталог <em>знаний</em></h1>
                    <p>
                        Выберите рубрику для знакомства с материалами, исследованиями и источниками.
                        Содержание каталога формируется в общей системе публикаций.
                    </p>
                </div>
                <span class="catalog-page__symbol" aria-hidden="true">λόγος</span>
            </header>

            <div class="catalog-page__toolbar">
                <div>
                    <h2>Все рубрики</h2>
                    <p v-if="!isLoading && !error" class="catalog-page__count">
                        {{ categories.length }} {{ rubricWord(categories.length) }}
                    </p>
                </div>
                <SearchField
                    v-model="query"
                    placeholder="Найти рубрику..."
                    label="Поиск по рубрикам"
                />
            </div>

            <div v-if="isLoading" class="state-card" role="status">Загружаем рубрики…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">
                {{ error }}
            </div>
            <div v-else-if="filteredCategories.length" class="catalog-page__grid">
                <CategoryArticles :categories="filteredCategories" />
            </div>
            <div v-else-if="query" class="state-card">
                По запросу «{{ query }}» рубрики не найдены. Попробуйте другое слово.
            </div>
            <div v-else class="state-card">Пока нет опубликованных рубрик.</div>
        </div>
    </main>
</template>

<script>
import CategoryArticles from '@/components/knowledge/CategoryArticles.vue';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs.vue';
import SearchField from '@/components/ui/SearchField.vue';
import { filterByFields, russianPlural } from '@/domain/publication.mjs';
import PublicContentService from '@/API/PublicContentService';
import { applyCatalogSeo } from '@/seo';

export default {
    name: 'CatalogPage',
    components: { CategoryArticles, PageBreadcrumbs, SearchField },
    data() {
        return {
            isLoading: true,
            error: '',
            categories: [],
            query: '',
            breadcrumbs: [{ label: 'Главная', to: { name: 'home' } }, { label: 'Каталог знаний' }]
        };
    },
    computed: {
        filteredCategories() {
            return filterByFields(this.categories, this.query, ['title', 'description']);
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
            return russianPlural(count, ['рубрика', 'рубрики', 'рубрик']);
        }
    }
};
</script>
