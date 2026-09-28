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

                    <p v-if="articleLead" class="article-sheet__lead">{{ articleLead }}</p>

                    <div v-if="profile.speaker || keywords.length" class="article-sheet__facts">
                        <span v-if="profile.speaker">
                            <strong>Автор:</strong> {{ profile.speaker }}
                        </span>
                        <span
                            v-for="keyword in keywords"
                            :key="keyword"
                            class="article-sheet__keyword"
                        >{{ keyword }}</span>
                    </div>

                    <time v-if="article.published_at" :datetime="article.published_at">
                        {{ formatDate(article.published_at) }}
                    </time>
                </header>

                <div class="article-sheet__content" v-html="article.content"></div>

                <section v-if="bibliography.length" class="article-sheet__bibliography">
                    <span class="eyebrow">Источники</span>
                    <h2>Литература и источники</h2>
                    <ol>
                        <li v-for="item in bibliography" :key="item">{{ item }}</li>
                    </ol>
                </section>
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
    computed: {
        profile() {
            const envelope = this.article?.data;
            if (
                !envelope ||
                envelope.version !== 1 ||
                !['logos.article', 'logos.lecture'].includes(envelope.schema) ||
                typeof envelope.data !== 'object' ||
                envelope.data === null
            ) {
                return {};
            }
            return envelope.data;
        },
        articleLead() {
            return this.profile.abstract || this.article?.excerpt || '';
        },
        keywords() {
            return Array.isArray(this.profile.keywords)
                ? this.profile.keywords
                : [];
        },
        bibliography() {
            return Array.isArray(this.profile.bibliography)
                ? this.profile.bibliography
                : [];
        }
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
.article-sheet__facts {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 18px;
    color: var(--color-text-muted);
    font-size: 14px;
}
.article-sheet__keyword {
    padding: 4px 9px;
    border-radius: 999px;
    background: var(--color-surface-muted);
    color: var(--color-accent);
    font-size: 13px;
    font-weight: 700;
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
.article-sheet__content img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 1.6em auto;
    border-radius: 14px;
}
.article-sheet__bibliography {
    padding: 0 clamp(28px, 5vw, 56px) clamp(28px, 5vw, 56px);
    border-top: 1px solid var(--color-border);
}
.article-sheet__bibliography .eyebrow {
    display: block;
    margin-top: 28px;
}
.article-sheet__bibliography h2 {
    margin: 8px 0 18px;
    font-size: 26px;
}
.article-sheet__bibliography ol {
    display: grid;
    gap: 10px;
    padding-left: 22px;
    color: var(--color-text-muted);
    line-height: 1.6;
}
</style>
