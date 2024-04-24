<template>
    <section class="categories">
        <div class="container categories__wrapper">
            <h1>{{ categoryname }} - База знаний</h1>
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
            document.title = `${this.categoryname} | База знаний | Logos`;
            /* this.getData(); */
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
                        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem quae sint, rem mollitia nulla hic quasi autem quod nostrum qui exercitationem sit earum quis nobis officia illum? Aspernatur consectetur architecto aliquam necessitatibus aperiam maiores dicta et eaque, natus, veniam ad reprehenderit sequi doloribus ullam deserunt nam recusandae adipisci, nostrum neque? Molestiae tenetur corporis sapiente laudantium perferendis suscipit aliquam perspiciatis, iusto quas praesentium repellendus tempore adipisci officiis mollitia illo obcaecati rerum totam! Tempora, nihil inventore facere harum accusantium obcaecati aliquid molestiae consequuntur maxime, magnam vero eveniet est enim nisi debitis asperiores corporis, ut ipsum labore accusamus sed perferendis distinctio eum! Inventore, obcaecati? Adipisci inventore, ut eaque totam voluptate eum maxime sequi fuga odit quod? Sapiente nemo consequatur ullam, veniam, natus excepturi rerum cumque earum in culpa expedita modi ipsam fugit illum a iste exercitationem, vitae architecto accusantium adipisci cupiditate officia illo. Earum fuga suscipit ipsum corporis sint est magni magnam odit!",
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