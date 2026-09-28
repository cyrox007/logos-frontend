<template>
    <article v-for="article in articles" :key="article.id" class="article-card">
        <router-link
            class="article-card__link"
            :to="{
                name: 'article',
                params: {
                    catName: article.category ? article.category.slug : 'materials',
                    slug: article.slug
                }
            }"
        >
            <div class="article-card__body">
                <span class="article-card__category">
                    {{ article.category ? article.category.title : 'Материал' }}
                </span>
                <h2>{{ article.title }}</h2>
                <p>{{ article.excerpt }}</p>
                <time v-if="article.published_at" :datetime="article.published_at">
                    {{ formatDate(article.published_at) }}
                </time>
            </div>
            <span class="article-card__more">Читать →</span>
        </router-link>
    </article>
</template>

<script>
export default {
    name: 'ArticleElement',
    props: {
        articles: {
            type: Array,
            default: () => []
        }
    },
    methods: {
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
.article-card {
    border: 1px solid var(--color-border);
    border-radius: 18px;
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
}
.article-card__link {
    padding: 22px;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 18px;
    color: inherit;
    text-align: left;
    text-decoration: none;
}
.article-card__body {
    min-width: 0;
}
.article-card__category {
    color: var(--color-accent);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .07em;
    text-transform: uppercase;
}
.article-card h2 {
    margin: 8px 0 10px;
    font-size: 24px;
}
.article-card p {
    color: var(--color-text-muted);
    line-height: 1.55;
}
.article-card time {
    margin-top: 14px;
    display: block;
    color: var(--color-text-muted);
    font-size: 13px;
}
.article-card__more {
    align-self: center;
    color: var(--color-accent);
    font-weight: 700;
}
@media (max-width: 620px) {
    .article-card__link {
        grid-template-columns: 1fr;
    }
    .article-card__more {
        justify-self: start;
    }
}
</style>
