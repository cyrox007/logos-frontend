<template>
    <section class="last-articles">
        <div class="container">
            <div class="last-articles__wrapper">
                <LastArticles :posts="posts"/>
            </div>
        </div>
    </section>
    <section class="other"></section>
</template>

<script>
    import LastArticles from '@/components/Articles/LastArticles.vue' 
    export default {
        name: "MainPage",
        components: {
            LastArticles 
        },
        beforeMount() {
            document.title = "Logos | Главная";
        },
        data () {
            
            return {
                posts: [
                    {
                        uid: "fjdkfsd-fse-fse-fSCd-sC", 
                        title: 'article 1',
                        images: 'https://r4.wallpaperbetter.com/wallpaper/1008/573/262/the-sky-clouds-trees-landscape-wallpaper-dcb4070adceb26342be4e9ebf685ac19.jpg',
                        category: 'category',
                        tags: ["tag1", "tag2", "tag3"],
                        slug: 'article_1'
                    },
                    {
                        uid: "fjdkfsd-fse-fse-fSCd-sC", 
                        title: 'article 2',
                        images: 'https://r4.wallpaperbetter.com/wallpaper/1008/573/262/the-sky-clouds-trees-landscape-wallpaper-dcb4070adceb26342be4e9ebf685ac19.jpg',
                        category: 'category',
                        tags: ["tag1", "tag2", "tag3"],
                        slug: 'article_2'
                    },
                    {
                        uid: "fjdkfsd-fse-fse-fSCd-sC", 
                        title: 'article 3',
                        images: 'https://r4.wallpaperbetter.com/wallpaper/1008/573/262/the-sky-clouds-trees-landscape-wallpaper-dcb4070adceb26342be4e9ebf685ac19.jpg',
                        category: 'category',
                        tags: ["tag1", "tag2", "tag3"],
                        slug: 'article_3'
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
    display: grid;
    
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: repeat(4, 94px);
    grid-template-areas: 
    "A A B B"
    "A A B B"
    "A A C C"
    "A A C C";
}
.main-article:first-child {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 5;
    grid-area: A;
}
.main-article:nth-child(2) {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 1;
    grid-row-end: 3;
    grid-area: B;
}
.main-article:nth-child(3) {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 3;
    grid-row-end: 5;
    grid-area: C;
}
@media screen and (max-width: 700px) {
    .last-articles__wrapper {
        grid-template-columns: repeat(1, 100%);
        grid-template-rows: repeat(3, 150px);
        grid-template-areas: 
        "A"
        "B"
        "C";
    }
    
}
.other {
    height: 100%;
    min-height: 100%;
}
</style>
