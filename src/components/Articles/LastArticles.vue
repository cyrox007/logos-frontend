<template>
    <article v-bind:data-id='id' class="main-article">
        <div class="main-article--preview">
            <img :src="images" :alt="title">
            
        </div>
        <div class="main-article__body">
            <div class="main-article__body--category">
                <a :href="'/category/'+category">{{ category }}</a>
            </div>
            <h2>{{ title }}</h2>
            <p>{{ description }}</p>
            <div class="main-article__body--link">
                <a v-bind:href="'/posts/'+slug ">Read more</a>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "LastArticles",
        props: {
            id: { type: Number },
            title: { type: String },
            images: { type: String },
            category: { type: String },
            slug: { type: String }
        },
    }
</script>

<style>

.main-article {
  position: relative;
  height: 100%;
  width: 100%;
}
.main-article--preview {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.main-article__body {
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>