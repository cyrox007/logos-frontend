<template>
    <article class="category" v-for="category in categories" :key="category.uid" @click="$router.push({name: 'category', params: {catName: category.slug}})">
        <a>
            <div class="category__image">
                <img :src="category.image" :alt="category.name">
            </div>
            <span>{{ category.name }}</span>
        </a>
    </article>
</template>

<script>
export default {
    name: "CategoryArticles",
    props: {
        categories: { type: Array },
    },
}
</script>

<style>
    .category {
        position: relative;
        width: 300px;
        height: 300px;
        border: 1px solid var(--color-blue);
        background-color: var(--color-white);

        cursor: pointer;
    }

    .category a {
        position: absolute;
        top: 0;bottom: 0;
        left: 0;right: 0;
        margin: auto;
        padding: 20px;
        display: flex;
        gap: 10px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        text-decoration: none;
        color: black;
    }
</style>