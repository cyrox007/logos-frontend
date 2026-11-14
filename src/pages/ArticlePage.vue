<template>
    <main class="article-page">
        <div class="container">
            <PageBreadcrumbs :items="breadcrumbs" />

            <div v-if="isLoading" class="state-card" role="status">Загружаем материал…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">{{ error }}</div>

            <div v-else-if="article" class="article-page__layout">
                <article class="article-sheet">
                    <ArticleHeader
                        :article="article"
                        :profile="profile"
                        :category-title="categoryTitle"
                        :reading-minutes="readingMinutes"
                    />
                    <ArticleContent ref="articleContent" :html="article.content || ''" />
                    <ArticleSources :items="bibliography" />
                    <div class="article-sheet__return">
                        <router-link class="text-link" :to="{ name: 'category', params: { catName: categorySlug } }">
                            ← Вернуться к материалам рубрики
                        </router-link>
                    </div>
                </article>

                <ArticleAside :toc-items="tocItems" />
            </div>
        </div>
    </main>
</template>

<script>
import PublicContentService from '@/API/PublicContentService';
import { applyArticleSeo } from '@/seo';
import { getPublicationProfile, estimateReadingMinutes } from '@/domain/publication.mjs';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs.vue';
import ArticleHeader from '@/components/article/ArticleHeader.vue';
import ArticleContent from '@/components/article/ArticleContent.vue';
import ArticleSources from '@/components/article/ArticleSources.vue';
import ArticleAside from '@/components/article/ArticleAside.vue';

export default {
    name: 'ArticlePage',
    components: { PageBreadcrumbs, ArticleHeader, ArticleContent, ArticleSources, ArticleAside },
    data() {
        return { isLoading: true, error: '', article: null, tocItems: [] };
    },
    computed: {
        profile() { return getPublicationProfile(this.article); },
        categorySlug() { return this.article?.category?.slug || this.$route.params.catName; },
        categoryTitle() { return this.article?.category?.title || 'Материал'; },
        bibliography() { return Array.isArray(this.profile.bibliography) ? this.profile.bibliography : []; },
        readingMinutes() { return estimateReadingMinutes(this.article?.content); },
        breadcrumbs() {
            return [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Каталог знаний', to: { name: 'lecture' } },
                { label: this.categoryTitle, to: { name: 'category', params: { catName: this.categorySlug } } },
                { label: this.article?.title || 'Материал' }
            ];
        }
    },
    watch: {
        '$route.params.slug'() { this.loadArticle(); }
    },
    created() { this.loadArticle(); },
    methods: {
        async loadArticle() {
            const slug = this.$route.params.slug;
            this.isLoading = true;
            this.article = null;
            this.tocItems = [];
            this.error = '';
            try {
                const response = await PublicContentService.getPublication(slug);
                if (slug !== this.$route.params.slug) return;
                this.article = response.data.item;
                applyArticleSeo(this.article);
            } catch (error) {
                if (slug !== this.$route.params.slug) return;
                console.error(error);
                this.error = error?.response?.status === 404
                    ? 'Материал не найден.'
                    : 'Не удалось загрузить материал.';
            } finally {
                if (slug === this.$route.params.slug) {
                    this.isLoading = false;
                    await this.$nextTick();
                    if (slug === this.$route.params.slug) {
                        this.tocItems = this.$refs.articleContent?.buildToc() || [];
                    }
                }
            }
        }
    }
};
</script>
