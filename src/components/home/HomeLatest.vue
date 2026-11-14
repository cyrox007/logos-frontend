<template>
    <section class="home-section home-latest" aria-labelledby="home-latest-title">
        <div class="container">
            <div class="section-heading">
                <div class="section-heading__lead">
                    <span class="eyebrow">Новые материалы</span>
                    <h2 id="home-latest-title" class="section-title">Последние публикации</h2>
                    <p class="section-heading__description">
                        Статьи, размышления и исследования, добавленные в библиотеку.
                    </p>
                </div>
                <router-link class="text-link" :to="{ name: 'catalog' }"
                    >Перейти в каталог <span aria-hidden="true">↗</span></router-link
                >
            </div>
            <Transition name="content-switch" mode="out-in">
                <LoadingSkeleton
                    v-if="postsLoading"
                    key="loading"
                    variant="latest"
                    label="Загружаем публикации…"
                />
                <AsyncState
                    v-else-if="postsError"
                    key="error"
                    type="error"
                    title="Не удалось загрузить публикации"
                    :message="postsError"
                    action-label="Повторить"
                    @action="$emit('retry')"
                />
                <LastArticles v-else-if="posts.length" key="content" :posts="posts" />
                <AsyncState
                    v-else
                    key="empty"
                    title="Новых материалов пока нет"
                    message="Публикации появятся здесь после выхода первых статей и исследований."
                />
            </Transition>
        </div>
    </section>
</template>

<script>
import LastArticles from '@/components/knowledge/LastArticles.vue';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue';
import AsyncState from '@/components/ui/AsyncState.vue';

export default {
    name: 'HomeLatest',
    components: { LastArticles, LoadingSkeleton, AsyncState },
    emits: ['retry'],
    props: {
        posts: { type: Array, default: () => [] },
        postsLoading: { type: Boolean, default: false },
        postsError: { type: String, default: '' }
    }
};
</script>
