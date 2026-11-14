<template>
    <section class="home-section home-categories" aria-labelledby="home-categories-title">
        <div class="container">
            <div class="section-heading">
                <div class="section-heading__lead">
                    <span class="eyebrow">Навигация по знаниям</span>
                    <h2 id="home-categories-title" class="section-title">Откройте свою тему</h2>
                    <p class="section-heading__description">
                        Материалы собраны по рубрикам: от первого знакомства с темой до подробного
                        изучения источников.
                    </p>
                </div>
                <router-link class="text-link" :to="{ name: 'catalog' }"
                    >Все рубрики <span aria-hidden="true">↗</span></router-link
                >
            </div>
            <Transition name="content-switch" mode="out-in">
                <LoadingSkeleton
                    v-if="categoriesLoading"
                    key="loading"
                    variant="grid"
                    label="Загружаем рубрики…"
                />
                <AsyncState
                    v-else-if="categoriesError"
                    key="error"
                    type="error"
                    title="Не удалось загрузить рубрики"
                    :message="categoriesError"
                    action-label="Повторить"
                    @action="$emit('retry')"
                />
                <CategoryArticles
                    v-else-if="categories.length"
                    key="content"
                    layout="home"
                    :categories="categories.slice(0, 6)"
                />
                <AsyncState
                    v-else
                    key="empty"
                    title="Рубрики пока готовятся"
                    message="Здесь появятся направления и темы после публикации первых материалов."
                />
            </Transition>
        </div>
    </section>
</template>

<script>
import CategoryArticles from '@/components/knowledge/CategoryArticles.vue';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue';
import AsyncState from '@/components/ui/AsyncState.vue';

export default {
    name: 'HomeCategories',
    components: { CategoryArticles, LoadingSkeleton, AsyncState },
    emits: ['retry'],
    props: {
        categories: { type: Array, default: () => [] },
        categoriesLoading: { type: Boolean, default: false },
        categoriesError: { type: String, default: '' }
    }
};
</script>
