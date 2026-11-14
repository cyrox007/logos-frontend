<template>
    <section
        v-if="items.length"
        class="article-sheet__bibliography"
        aria-labelledby="bibliography-heading"
    >
        <span class="eyebrow">Для дальнейшего изучения</span>
        <h2 id="bibliography-heading">Источники и литература</h2>
        <ol>
            <li v-for="(item, index) in items" :key="index">{{ item }}</li>
        </ol>
    </section>
</template>

<script>
export default {
    name: 'ArticleSources',
    props: { items: { type: Array, default: () => [] } }
};
</script>
