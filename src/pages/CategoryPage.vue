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

            <Transition name="content-switch" mode="out-in">
                <LoadingSkeleton
                    v-if="isLoading"
                    key="loading"
                    variant="list"
                    label="Загружаем публикации…"
                />
                <AsyncState
                    v-else-if="error"
                    key="error"
                    type="error"
                    title="Не удалось загрузить рубрику"
                    :message="error"
                    action-label="Повторить"
                    @action="loadData"
                />
                <ArticleElement
                    v-else-if="filteredArticles.length"
                    key="content"
                    :articles="filteredArticles"
                />
                <AsyncState
                    v-else-if="query"
                    key="search-empty"
                    title="Материалы не найдены"
                    :message="'По запросу «' + query + '» ничего не найдено.'"
                    action-label="Сбросить поиск"
                    @action="query = ''"
                />
                <AsyncState
                    v-else
                    key="empty"
                    title="В рубрике пока нет материалов"
                    message="Опубликованные статьи и исследования появятся здесь."
                />
            </Transition>

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
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue';
import AsyncState from '@/components/ui/AsyncState.vue';
import { filterByFields, russianPlural } from '@/domain/publication.mjs';
import PublicContentService from '@/API/PublicContentService';
import { applyCategorySeo } from '@/seo';

export default {
    name: 'CategoryPage',
    components: { ArticleElement, PageBreadcrumbs, SearchField, LoadingSkeleton, AsyncState },
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
