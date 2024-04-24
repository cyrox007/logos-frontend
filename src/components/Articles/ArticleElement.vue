<template>
    <article class="article" v-for="article in articles" :key="article.uid" @click="$router.push({name: 'article', params: {catName: article.catName, slug: article.slug }})">
        
        <div class="article__image">
            <img :src="article.image" :alt="article.name">
        </div>
        <div class="article__body">
            <h2 class="article__name">{{ article.name }}</h2>
            <p class="article__description">{{ article.description }}</p>
        </div>

    </article>
</template>

<script>
export default {
    name: "ArticleElement",
    props: {
        articles: { type: Array },
    },
}
</script>

<style>
    .article {
        position: relative;
        width: 100%;
        height: auto;
        /* max-height: 200px; */
        padding: 20px;
        display: flex;
        cursor: pointer;
        border: 1px solid var(--color-blue);
        background-color: var(--color-white);
        text-align: left;
    }
    .article__image {
        width: 200px;
        height: 200px;
    }
    .article__image img {
        width: 100%;
        height: auto;
    }
</style>