<template>
    <section class="last-articles">
        <div class="container">
            <h1>Сайт стартует</h1>
            <h2>Ожидайте</h2>
            <ul>
                <li>База знаний</li>
                <li>Полезные статьи</li>
                <li>Мессенджер</li>
            </ul>
            <div class="last-articles__wrapper">
                <!-- <div class="last-articles__item" v-for="post in posts" :key="post.id">
                    <LastArticles 
                        v-bind:id="post.id"
                        v-bind:title="post.title"
                        v-bind:images="post.images"
                        v-bind:category="post.category"
                        v-bind:slug="post.slug"
                    />
                    
                </div> -->
                
            </div>
        </div>
    </section>
</template>

<script>
    /* import LastArticles from '@/components/Articles/LastArticles.vue' */
    export default {
        name: "MainPage",
        components: {
            /* LastArticles */
        },
        beforeMount() {
            document.title = "Logos"
        },
        data () {
            
            return {
                posts: [
                    {
                        id: 1, 
                        title: 'test',
                        images: 'i',
                        category: 'c',
                        slug: 's'
                    },
                    {
                        id: 2, 
                        title: 'test',
                        images: 'i',
                        category: 'c',
                        slug: 's'
                    },
                    {
                        id: 3, 
                        title: 'test',
                        images: 'i',
                        category: 'c',
                        slug: 's'
                    },
                ]
            }
        }
    }
</script>

<style>
.last-articles {
    height: auto;
    margin: 40px 0;
}
.last-articles__wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, calc(375px / 2));
    grid-template-areas: 
    "A B"
    "A C"; 
}
@media screen and (max-width: 700px) {
    .last-articles__wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, calc(375px / 2));
        grid-template-areas: 
        "A"
        "B"
        "C";
    }
}
.last-articles__item:first-child {
    grid-area: A;     
}
.last-articles__item:nth-child(2) {
    grid-area: B;
}
.last-articles__item:nth-child(3) {
    grid-area: C;
}
</style>
