<template>
    <TransitionGroup name="card-list" tag="div" class="latest-grid" appear>
        <article
            v-for="(post, index) in posts"
            :key="post.id || post.slug"
            :style="{ '--item-index': Math.min(index, 6) }"
            class="latest-card"
            :class="{ 'latest-card--featured': index === 0 }"
        >
            <router-link
                class="latest-card__link"
                :to="{
                    name: 'publication',
                    params: { catName: post.category?.slug || 'materials', slug: post.slug }
                }"
            >
                <div class="latest-card__heading">
                    <span class="latest-card__category">{{
                        post.category?.title || 'Материал'
                    }}</span>
                    <span class="latest-card__index">{{ String(index + 1).padStart(2, '0') }}</span>
                </div>
                <div class="latest-card__main">
                    <h3>{{ post.title }}</h3>
                    <p v-if="post.excerpt">{{ post.excerpt }}</p>
                </div>
                <div class="latest-card__bottom">
                    <time v-if="post.published_at" :datetime="post.published_at">{{
                        formatDate(post.published_at)
                    }}</time>
                    <span class="latest-card__more">Читать <span aria-hidden="true">↗</span></span>
                </div>
            </router-link>
        </article>
    </TransitionGroup>
</template>

<script>
import { formatPublicationDate } from '@/domain/publication.mjs';

export default {
    name: 'LastArticles',
    props: { posts: { type: Array, default: () => [] } },
    methods: { formatDate: formatPublicationDate }
};
</script>

<style>
.latest-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 19px;
}
.latest-card {
    min-width: 0;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: #fff;
    box-shadow: var(--shadow-soft);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.latest-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-hover);
}
.latest-card--featured {
    grid-column: span 2;
    background: linear-gradient(140deg, #e2f1e4, #f9fcf6);
    border-color: #c5dec9;
}
.latest-card__link {
    display: flex;
    flex-direction: column;
    min-height: 288px;
    height: 100%;
    padding: 29px;
    color: var(--color-text);
    text-decoration: none;
}
.latest-card__heading,
.latest-card__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}
.latest-card__category {
    color: var(--color-accent-dark);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
.latest-card__index {
    color: var(--color-gold);
    font: 20px var(--font-display);
}
.latest-card__main {
    flex: 1;
    padding: 25px 0;
}
.latest-card__main h3 {
    margin-bottom: 13px;
    font: 500 clamp(26px, 3vw, 35px) / 1.16 var(--font-display);
}
.latest-card--featured h3 {
    max-width: 610px;
    font-size: clamp(34px, 4vw, 51px);
}
.latest-card__main p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.7;
}
.latest-card__bottom {
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
    font-size: 12px;
}
.latest-card__bottom time {
    color: var(--color-text-muted);
}
.latest-card__more {
    color: var(--color-accent-dark);
    font-weight: 700;
    white-space: nowrap;
}
@media (max-width: 900px) {
    .latest-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}
@media (max-width: 600px) {
    .latest-grid {
        grid-template-columns: 1fr;
    }
    .latest-card--featured {
        grid-column: auto;
    }
    .latest-card__link {
        min-height: 238px;
        padding: 22px;
    }
    .latest-card--featured h3 {
        font-size: 34px;
    }
}
</style>
