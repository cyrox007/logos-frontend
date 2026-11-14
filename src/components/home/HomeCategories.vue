<template>
<section class="home-section home-categories" aria-labelledby="home-categories-title">
            <div class="container">
                <div class="section-heading">
                    <div class="section-heading__lead">
                        <span class="eyebrow">Навигация по знаниям</span>
                        <h2 id="home-categories-title" class="section-title">Откройте свою тему</h2>
                        <p class="section-heading__description">Материалы собраны по рубрикам: от первого знакомства с темой до подробного изучения источников.</p>
                    </div>
                    <router-link class="text-link" :to="{ name: 'catalog' }">Все рубрики <span aria-hidden="true">↗</span></router-link>
                </div>
                <div v-if="categoriesLoading" class="state-card" role="status">Загружаем рубрики…</div>
                <div v-else-if="categoriesError" class="state-card state-card--error" role="alert">{{ categoriesError }}</div>
                <div v-else-if="categories.length" class="home-categories__grid">
                    <CategoryArticles :categories="categories.slice(0, 6)" />
                </div>
                <div v-else class="state-card">Рубрики пока готовятся к публикации.</div>
            </div>
        </section>
</template>

<script>
import CategoryArticles from '@/components/knowledge/CategoryArticles.vue';

export default {
    name: 'HomeCategories',
    components: { CategoryArticles },
    props: {
        categories: { type: Array, default: () => [] },
        categoriesLoading: { type: Boolean, default: false },
        categoriesError: { type: String, default: '' }
    }
};
</script>
