<template>
    <section class="categories">
        <div class="container categories__wrapper">
            <h1>База знаний - {{ categoryname }}</h1>
            <div class="categories__list">
                <article-element :articles="articles"/>
            </div>
        </div>
    </section>
</template>

<script>
    import ArticleElement from '@/components/Articles/ArticleElement.vue';
    /* import CategoriesService from '@/API/CategoriesService.js'; */
    export default {
        name: "LectureListPage",
        components: {
            ArticleElement
        },
        methods: {
            /* async getData() {
                try {
                    this.isLoading = true;
                    const response = await CategoriesService.getCategories();
                    console.log(response);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            } */
        },
        beforeMount() {
            document.title = "Logos | База знаний";
            /* this.getData(); */
            console.log(this.$route.params.catName);
        },
        data () {
            return {
                isLoading: false,
                categoryname: "Философия",
                articles: [
                    {
                        uid: "uid-1",
                        image: "https://img.icons8.com/ios/100/book--v1.png",
                        name: "Название статьи",
                        description: "Описание статьи",
                        catName: this.$route.params.catName,
                        slug: 'name-article'
                    }
                ]
            }
        }
    }
</script>

<style>

.categories {
    display: flex;
    flex-direction: row;
    padding: 40px 0;
}
.categories__wrapper {
    display: flex;
    flex-direction: column;
}
.categories__wrapper h1 {
    margin-bottom: 40px;
}
.categories__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

</style>