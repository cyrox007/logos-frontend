<template>
    <article v-for="post in posts" :key="post.uid" class="main-article">
        <div class="main-article--preview">
            <img :src="post.images" width="570" height="375" :alt="post.title">
        </div>
        <div class="main-article__body">
            <div class="main-article__body--category">
                <a :href="'/category/' + post.category">{{ post.category }}</a>
            </div>
            <h2>{{ post.title }}</h2>
            <p>{{ post.description }}</p>
            <div class="main-article__body--link">
                <a v-bind:href="'/posts/' + post.slug">Read more</a>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name: "LastArticles",
    props: {
        posts: { type: Array },
    },
}
</script>

<style>

.main-article {
    position: relative;
    z-index: 0;
    display: flex;
    max-width: 600px;
    width: 100%;
    height: auto;
    overflow: hidden;
}

.main-article--preview {
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    z-index: 1;
}

.main-article--preview img {
    width: 100%;
    height: auto;
    object-fit: cover;
    object-position: 50% 50%;
}

.main-article__body {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    color: white;
}
.main-article__body--category a {
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: white;
    background-color: rgb(13, 192, 132);
    border-radius: 3px;
}

</style>