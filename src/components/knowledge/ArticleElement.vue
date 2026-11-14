<template>
    <TransitionGroup name="card-list" tag="div" class="publication-list__items" appear>
        <article
        v-for="(article, index) in articles"
        :key="article.id || article.slug"
        :style="{ '--item-index': Math.min(index, 6) }"
        class="article-card"
    >
        <router-link
            class="article-card__link"
            :to="{
                name: 'publication',
                params: { catName: article.category?.slug || 'materials', slug: article.slug }
            }"
        >
            <span class="article-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="article-card__body">
                <span class="article-card__category">{{
                    article.category?.title || 'Материал'
                }}</span>
                <h3>{{ article.title }}</h3>
                <p v-if="article.excerpt">{{ article.excerpt }}</p>
                <time v-if="article.published_at" :datetime="article.published_at">{{
                    formatDate(article.published_at)
                }}</time>
            </div>
            <span class="article-card__more">Читать <span aria-hidden="true">↗</span></span>
        </router-link>
        </article>
    </TransitionGroup>
</template>

<script>
import { formatPublicationDate } from '@/domain/publication.mjs';

export default {
    name: 'ArticleElement',
    props: { articles: { type: Array, default: () => [] } },
    methods: { formatDate: formatPublicationDate }
};
</script>

<style>
.article-card {
    border: 1px solid var(--color-border);
    border-radius: 11px;
    background: #fff;
    transition: border-color 0.2s ease, transform 0.2s ease;
}
.article-card:hover {
    border-color: #a9ceaf;
    transform: translateX(3px);
}
.article-card__link {
    display: grid;
    grid-template-columns: 54px minmax(0, 1fr) auto;
    align-items: start;
    gap: 25px;
    padding: 27px 30px;
    color: inherit;
    text-decoration: none;
}
.article-card__number {
    color: var(--color-gold);
    font: 22px var(--font-display);
}
.article-card__category {
    color: var(--color-accent-dark);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}
.article-card h3 {
    margin: 8px 0;
    font: 500 clamp(25px, 3vw, 34px) / 1.18 var(--font-display);
}
.article-card p {
    max-width: 740px;
    color: var(--color-text-muted);
    font-size: 14px;
}
.article-card time {
    display: block;
    margin-top: 15px;
    color: var(--color-text-muted);
    font-size: 12px;
}
.article-card__more {
    align-self: center;
    color: var(--color-accent-dark);
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
}
@media (max-width: 650px) {
    .article-card__link {
        grid-template-columns: 32px minmax(0, 1fr);
        gap: 15px;
        padding: 21px 17px;
    }
    .article-card__more {
        grid-column: 2;
        justify-self: start;
    }
    .article-card__number {
        font-size: 18px;
    }
}
</style>
