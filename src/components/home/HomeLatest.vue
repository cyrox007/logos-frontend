<template>
<section class="home-section home-latest" aria-labelledby="home-latest-title">
            <div class="container">
                <div class="section-heading">
                    <div class="section-heading__lead">
                        <span class="eyebrow">Новые материалы</span>
                        <h2 id="home-latest-title" class="section-title">Последние публикации</h2>
                        <p class="section-heading__description">Статьи, размышления и исследования, добавленные в библиотеку.</p>
                    </div>
                    <router-link class="text-link" :to="{ name: 'catalog' }">Перейти в каталог <span aria-hidden="true">↗</span></router-link>
                </div>
                <div v-if="postsLoading" class="state-card" role="status">Загружаем публикации…</div>
                <div v-else-if="postsError" class="state-card state-card--error" role="alert">{{ postsError }}</div>
                <LastArticles v-else-if="posts.length" :posts="posts" />
                <div v-else class="state-card">Публикации появятся здесь после выхода первых материалов.</div>
            </div>
        </section>
</template>

<script>
import LastArticles from '@/components/knowledge/LastArticles.vue';

export default {
    name: 'HomeLatest',
    components: { LastArticles },
    props: {
        posts: { type: Array, default: () => [] },
        postsLoading: { type: Boolean, default: false },
        postsError: { type: String, default: '' }
    }
};
</script>
