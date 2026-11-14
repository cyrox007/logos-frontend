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
                    <p v-if="!isLoading && !error">
                        {{ articles.length }} {{ materialWord(articles.length) }}
                    </p>
                </div>
                <SearchField
                    v-model="query"
                    placeholder="Поиск по материалам..."
                    label="Поиск по материалам рубрики"
                />
            </div>

            <div v-if="isLoading" class="state-card" role="status">Загружаем публикации…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">
                {{ error }}
            </div>
            <div v-else-if="filteredArticles.length" class="publication-list__items">
                <ArticleElement :articles="filteredArticles" />
            </div>
            <div v-else-if="query" class="state-card">
                По запросу «{{ query }}» материалы не найдены.
            </div>
            <div v-else class="state-card">В этой рубрике пока нет опубликованных материалов.</div>

            <router-link class="publication-list__back text-link" :to="{ name: 'catalog' }"
                >← Вернуться к каталогу</router-link
            >
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
    name: 'CategoryPage',
    components: { ArticleElement, PageBreadcrumbs, SearchField },
    data() {
        return {
            isLoading: true,
            error: '',
            categoryTitle: '',
            categoryDescription: '',
            articles: [],
            query: ''
        };
    },
    computed: {
        breadcrumbs() {
            return [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Каталог знаний', to: { name: 'catalog' } },
                { label: this.categoryTitle }
            ];
        },
        filteredArticles() {
            return filterByFields(this.articles, this.query, ['title', 'excerpt']);
        }
    },
    watch: {
        '$route.params.catName'() {
            this.loadData();
        }
    },
    created() {
        this.loadData();
    },
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
                const category = (categoriesResponse.data.items || []).find(
                    item => item.slug === slug
                );
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
