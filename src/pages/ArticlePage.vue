<template>
    <main class="article-page">
        <div class="container article-page__container">
            <div v-if="isLoading" class="state-card">Загружаем материал…</div>
            <div v-else-if="error" class="state-card state-card--error">{{ error }}</div>

            <article v-else-if="article" class="article-sheet">
                <header class="article-sheet__header">
                    <router-link
                        class="back-link"
                        :to="{
                            name: 'category',
                            params: {
                                catName: article.category ? article.category.slug : $route.params.catName
                            }
                        }"
                    >
                        ← К рубрике
                    </router-link>
                    <span class="eyebrow">
                        {{ article.category ? article.category.title : 'Материал' }}
                    </span>
                    <h1>{{ article.title }}</h1>
                    <p v-if="article.excerpt" class="article-sheet__lead">{{ article.excerpt }}</p>
                    <time v-if="article.published_at" :datetime="article.published_at">
                        {{ formatDate(article.published_at) }}
                    </time>
                </header>

                <div class="article-sheet__content" v-html="article.content"></div>
            </article>
        </div>
    </main>
</template>

<script>
import PublicContentService from '@/API/PublicContentService';
import { applyArticleSeo } from '@/seo';

export default {
    name: 'ArticlePage',
    data() {
        return {
            isLoading: true,
            error: '',
            article: null
        };
    },
    watch: {
        '$route.params.slug': {
            async handler() {
                await this.loadArticle();
            }
        }
    },
    async created() {
        await this.loadArticle();
    },
    methods: {
        async loadArticle() {
            this.isLoading = true;
            this.error = '';
            try {
                const response = await PublicContentService.getPublication(
                    this.$route.params.slug
                );
                this.article = response.data.item;
                applyArticleSeo(this.article);
            } catch (error) {
                console.error(error);
                this.article = null;
                this.error = error?.response?.status === 404
                    ? 'Материал не найден.'
                    : 'Не удалось загрузить материал.';
            } finally {
                this.isLoading = false;
            }
        },
        formatDate(value) {
            return new Intl.DateTimeFormat('ru-RU', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }).format(new Date(value));
        }
    }
};
</script>

<style>
.article-page {
    padding: 54px 0 90px;
}
.article-page__container {
    max-width: 900px;
}
.article-sheet {
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 24px;
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
    text-align: left;
}
.article-sheet__header {
    padding: clamp(28px, 5vw, 56px);
    border-bottom: 1px solid var(--color-border);
}
.article-sheet__header h1 {
    max-width: 760px;
    margin: 10px 0 18px;
    font-size: clamp(36px, 6vw, 62px);
    line-height: 1.05;
    letter-spacing: -.035em;
}
.article-sheet__lead {
    max-width: 720px;
    color: var(--color-text-muted);
    font-size: 18px;
    line-height: 1.65;
}
.article-sheet__header time {
    margin-top: 18px;
    display: block;
    color: var(--color-text-muted);
    font-size: 14px;
}
.article-sheet__content {
    padding: clamp(28px, 5vw, 56px);
    font-size: 18px;
    line-height: 1.75;
}
.article-sheet__content > * + * {
    margin-top: 1.2em;
}
.article-sheet__content h2,
.article-sheet__content h3 {
    line-height: 1.2;
}
.article-sheet__content a {
    color: var(--color-accent);
}
</style>
