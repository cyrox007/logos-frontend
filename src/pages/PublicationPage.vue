<template>
    <main class="article-page">
        <div class="container">
            <PageBreadcrumbs :items="breadcrumbs" />

            <Transition name="content-switch" mode="out-in" @after-enter="buildToc">
                <LoadingSkeleton
                    v-if="isLoading"
                    key="loading"
                    variant="article"
                    label="Загружаем материал…"
                />
                <AsyncState
                    v-else-if="error"
                    key="error"
                    :type="notFound ? 'empty' : 'error'"
                    :title="notFound ? 'Материал не найден' : 'Не удалось открыть материал'"
                    :message="error"
                    :action-label="notFound ? '' : 'Повторить'"
                    @action="loadArticle"
                />
                <div v-else-if="article" key="article" class="article-page__layout">
                    <article class="article-sheet">
                        <ArticleHeader
                            :article="article"
                            :profile="profile"
                            :category-title="categoryTitle"
                            :reading-minutes="readingMinutes"
                        />
                        <ArticleContent
                            v-if="article.content"
                            ref="articleContent"
                            :html="article.content"
                        />
                        <div v-else class="article-sheet__reading">
                            <AsyncState
                                title="Текст пока недоступен"
                                message="Для этого материала ещё не опубликован основной текст."
                            />
                        </div>
                        <ArticleSources :items="bibliography" />
                        <div class="article-sheet__return">
                            <router-link
                                class="text-link"
                                :to="{ name: 'category', params: { catName: categorySlug } }"
                            >
                                ← Вернуться к материалам рубрики
                            </router-link>
                        </div>
                    </article>

                    <ArticleAside :toc-items="tocItems" />
                </div>
                <AsyncState
                    v-else
                    key="empty"
                    title="Материал не найден"
                    message="Возможно, публикация была перемещена или снята с публикации."
                />
            </Transition>
        </div>
    </main>
</template>

<script>
import PublicContentService from '@/API/PublicContentService';
import { applyArticleSeo } from '@/seo';
import { getPublicationProfile, estimateReadingMinutes } from '@/domain/publication.mjs';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs.vue';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue';
import AsyncState from '@/components/ui/AsyncState.vue';
import ArticleHeader from '@/components/article/ArticleHeader.vue';
import ArticleContent from '@/components/article/ArticleContent.vue';
import ArticleSources from '@/components/article/ArticleSources.vue';
import ArticleAside from '@/components/article/ArticleAside.vue';

export default {
    name: 'PublicationPage',
    components: {
        PageBreadcrumbs,
        ArticleHeader,
        ArticleContent,
        ArticleSources,
        ArticleAside,
        LoadingSkeleton,
        AsyncState
    },
    data() {
        return { isLoading: true, error: '', notFound: false, article: null, tocItems: [] };
    },
    computed: {
        profile() {
            return getPublicationProfile(this.article);
        },
        categorySlug() {
            return this.article?.category?.slug || this.$route.params.catName;
        },
        categoryTitle() {
            return this.article?.category?.title || 'Материал';
        },
        bibliography() {
            return Array.isArray(this.profile.bibliography) ? this.profile.bibliography : [];
        },
        readingMinutes() {
            return estimateReadingMinutes(this.article?.content);
        },
        breadcrumbs() {
            return [
                { label: 'Главная', to: { name: 'home' } },
                { label: 'Каталог знаний', to: { name: 'catalog' } },
                {
                    label: this.categoryTitle,
                    to: { name: 'category', params: { catName: this.categorySlug } }
                },
                { label: this.article?.title || 'Материал' }
            ];
        }
    },
    watch: {
        '$route.params.slug'() {
            this.loadArticle();
        }
    },
    created() {
        this.loadArticle();
    },
    methods: {
        buildToc() {
            this.tocItems = this.$refs.articleContent?.buildToc() || [];
        },
        async loadArticle() {
            const slug = this.$route.params.slug;
            this.isLoading = true;
            this.article = null;
            this.tocItems = [];
            this.error = '';
            this.notFound = false;
            try {
                const response = await PublicContentService.getPublication(slug);
                if (slug !== this.$route.params.slug) return;
                this.article = response.data.item;
                applyArticleSeo(this.article);
            } catch (error) {
                if (slug !== this.$route.params.slug) return;
                console.error(error);
                this.notFound = error?.response?.status === 404;
                this.error = this.notFound
                    ? 'Проверьте адрес или вернитесь в каталог.'
                    : 'Проверьте соединение и повторите попытку.';
            } finally {
                if (slug === this.$route.params.slug) {
                    this.isLoading = false;
                    await this.$nextTick();
                    if (slug === this.$route.params.slug) {
                        this.buildToc();
                    }
                }
            }
        }
    }
};
</script>
