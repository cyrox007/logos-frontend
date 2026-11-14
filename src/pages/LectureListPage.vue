<template>
    <main class="publication-list">
        <div class="container">
            <PageBreadcrumbs :items="breadcrumbs" />

            <header class="publication-list__header">
                <span class="eyebrow">Рубрика библиотеки</span>
                <h1>{{ categoryTitle }}</h1>
                <p v-if="categoryDescription">{{ categoryDescription }}</p>
                <p v-else>Статьи, исследования и другие материалы по выбранной теме.</p>
            </header>

            <div class="publication-list__toolbar">
                <div>
                    <h2>Материалы рубрики</h2>
                    <p v-if="!isLoading && !error">{{ articles.length }} {{ materialWord(articles.length) }}</p>
                </div>
                <SearchField v-model="query" placeholder="Поиск по материалам..." label="Поиск по материалам рубрики" />
            </div>

            <div v-if="isLoading" class="state-card" role="status">Загружаем публикации…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">{{ error }}</div>
            <div v-else-if="filteredArticles.length" class="publication-list__items">
                <ArticleElement :articles="filteredArticles" />
            </div>
            <div v-else-if="query" class="state-card">По запросу «{{ query }}» материалы не найдены.</div>
            <div v-else class="state-card">В этой рубрике пока нет опубликованных материалов.</div>

            <router-link class="publication-list__back text-link" :to="{ name: 'lecture' }">← Вернуться к каталогу</router-link>
        </div>
    </main>
</template>

<script>
import ArticleElement from '@/components/knowledge/ArticleElement.vue';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs.vue';
import SearchField from '@/components/ui/SearchField.vue';
import { filterByFields, russianPlural } from '@/domain/publication.mjs';
import PublicContentService from '@/API/PublicContentService';
import { applyCategorySeo } from '@/seo';

export default {
    name: 'LectureListPage',
    components: { ArticleElement, PageBreadcrumbs, SearchField },
    data() {
        return { isLoading: true, error: '', categoryTitle: '', categoryDescription: '', articles: [], query: '' };
    },
    computed: {
        breadcrumbs() {
            return [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Каталог знаний', to: { name: 'lecture' } },
                { label: this.categoryTitle }
            ];
        },
        filteredArticles() {
            return filterByFields(this.articles, this.query, ['title', 'excerpt']);
        }
    },
    watch: {
        '$route.params.catName'() { this.loadData(); }
    },
    created() { this.loadData(); },
    methods: {
        async loadData() {
            const slug = this.$route.params.catName;
            this.isLoading = true;
            this.error = '';
            this.query = '';
            this.categoryTitle = slug;
            this.categoryDescription = '';
            this.articles = [];
            try {
                const [categoriesResponse, publicationsResponse] = await Promise.all([
                    PublicContentService.getCategories(),
                    PublicContentService.getPublications({ category: slug, limit: 100 })
                ]);
                // Защита от устаревшего ответа при быстром переключении рубрик.
                if (slug !== this.$route.params.catName) return;
                const category = (categoriesResponse.data.items || []).find(item => item.slug === slug);
                this.categoryTitle = category?.title || slug;
                this.categoryDescription = category?.description || '';
                this.articles = publicationsResponse.data.items || [];
                applyCategorySeo(category || { title: this.categoryTitle });
            } catch (error) {
                if (slug !== this.$route.params.catName) return;
                console.error(error);
                this.error = 'Не удалось загрузить материалы рубрики.';
            } finally {
                if (slug === this.$route.params.catName) this.isLoading = false;
            }
        },
        materialWord(count) {
            return russianPlural(count, ['материал', 'материала', 'материалов']);
        }
    }
};
</script>

<style>
.publication-list { padding: 46px 0 95px; }
.publication-list__header { padding: 45px 0 60px; border-bottom: 1px solid var(--color-border); }
.publication-list__header h1 { margin: 18px 0; max-width: 880px; font-size: clamp(48px, 6vw, 80px); line-height: 1.06; letter-spacing: -.045em; }
.publication-list__header p { max-width: 750px; color: var(--color-text-muted); font-size: 17px; }
.publication-list__toolbar { display: flex; align-items: center; justify-content: space-between; gap: 25px; padding: 40px 0 24px; }
.publication-list__toolbar h2 { font-size: 32px; }
.publication-list__toolbar p { color: var(--color-text-muted); font-size: 13px; }
.publication-list__items { display: grid; gap: 13px; }
.publication-list__back { margin-top: 35px; }
@media (max-width: 620px) { .publication-list { padding: 30px 0 70px; } .publication-list__header { padding: 22px 0 36px; } .publication-list__header h1 { font-size: 48px; } .publication-list__toolbar { align-items: stretch; flex-direction: column; padding-top: 28px; } }
</style>
