<template>
    <article v-for="category in categories" :key="category.id" class="category-card">
        <router-link
            class="category-card__link"
            :to="{ name: 'category', params: { catName: category.slug } }"
        >
            <span class="category-card__mark">λόγος</span>
            <div>
                <h2>{{ category.title }}</h2>
                <p>{{ category.description || 'Материалы рубрики' }}</p>
            </div>
            <span class="category-card__more">Открыть →</span>
        </router-link>
    </article>
</template>

<script>
export default {
    name: 'CategoryArticles',
    props: {
        categories: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style>
.category-card {
    min-width: 0;
    border: 1px solid var(--color-border);
    border-radius: 20px;
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
}
.category-card__link {
    min-height: 220px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    color: inherit;
    text-align: left;
    text-decoration: none;
}
.category-card__mark {
    color: var(--color-accent);
    font-size: 28px;
}
.category-card h2 {
    margin-bottom: 8px;
    font-size: 24px;
}
.category-card p {
    color: var(--color-text-muted);
    line-height: 1.5;
}
.category-card__more {
    margin-top: auto;
    color: var(--color-accent);
    font-weight: 700;
}
</style>
