<template>
    <aside class="article-aside" aria-label="Навигация по материалу">
        <div v-if="tocItems.length" class="article-aside__panel">
            <span class="article-aside__eyebrow">В этом материале</span>
            <nav aria-label="Оглавление статьи">
                <a
                    v-for="item in tocItems"
                    :key="item.id"
                    :href="'#' + item.id"
                    :class="{ 'article-aside__subitem': item.level === 3 }"
                    >{{ item.title }}</a
                >
            </nav>
        </div>
        <div class="article-aside__panel article-aside__panel--context">
            <span class="article-aside__eyebrow">Библиотека Logos</span>
            <p>Изучайте смежные темы и материалы, сгруппированные по рубрикам.</p>
            <router-link class="text-link" :to="{ name: 'catalog' }">
                Каталог знаний <span aria-hidden="true">↗</span>
            </router-link>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'ArticleAside',
    props: { tocItems: { type: Array, default: () => [] } }
};
</script>
