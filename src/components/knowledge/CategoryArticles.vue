<template>
    <TransitionGroup
        name="card-list"
        tag="div"
        :class="layout === 'home' ? 'home-categories__grid' : 'catalog-page__grid'"
        appear
    >
        <article
        v-for="(category, index) in categories"
        :key="category.id || category.slug"
        class="category-card"
        :style="{ '--item-index': Math.min(index, 6) }"
    >
        <router-link
            class="category-card__link"
            :to="{ name: 'category', params: { catName: category.slug } }"
        >
            <div class="category-card__top">
                <span class="category-card__number">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="category-card__symbol" aria-hidden="true">✦</span>
            </div>
            <div class="category-card__content">
                <h3>{{ category.title }}</h3>
                <p>
                    {{ category.description || 'Откройте материалы и исследования по этой теме.' }}
                </p>
            </div>
            <span class="category-card__more">К материалам <span aria-hidden="true">↗</span></span>
        </router-link>
        </article>
    </TransitionGroup>
</template>

<script>
export default {
    name: 'CategoryArticles',
    props: {
        categories: { type: Array, default: () => [] },
        layout: { type: String, default: 'catalog' }
    }
};
</script>

<style>
.category-card {
    min-width: 0;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: #fff;
    box-shadow: var(--shadow-soft);
    transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
}
.category-card:hover {
    border-color: #9ac5a9;
    box-shadow: var(--shadow-hover);
    transform: translateY(-4px);
}
.category-card__link {
    display: flex;
    flex-direction: column;
    gap: 25px;
    min-height: 240px;
    height: 100%;
    padding: 24px 27px;
    color: var(--color-text);
    text-decoration: none;
}
.category-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--color-gold);
}
.category-card__number {
    font: 19px var(--font-display);
}
.category-card__symbol {
    font-size: 21px;
}
.category-card__content {
    flex: 1;
}
.category-card h3 {
    margin-bottom: 10px;
    font: 500 clamp(25px, 3vw, 30px) / 1.14 var(--font-display);
}
.category-card p {
    color: var(--color-text-muted);
    font-size: 14px;
    line-height: 1.7;
}
.category-card__more {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding-top: 15px;
    border-top: 1px solid var(--color-border);
    color: var(--color-accent-dark);
    font-size: 13px;
    font-weight: 700;
}
@media (max-width: 650px) {
    .category-card__link {
        min-height: 208px;
        padding: 23px;
    }
}
</style>
