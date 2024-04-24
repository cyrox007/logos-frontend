<template>
    <section class="categories">
        <div class="container categories__wrapper">
            <h1>База знаний</h1>
            <div class="categories__list" v-if="categories.length > 0">
                <category-articles :categories="categories"/>
            </div>
            <div class="categories__none" v-else>
                <p>К сожалению администратор еще не добавил ни одной категории и\или статьи. Пожалуйста, ожидайте обновлений</p>
            </div>
        </div>
    </section>
</template>

<script>
    import CategoryArticles from '@/components/Articles/CategoryArticles.vue';
    import CategoriesService from '@/API/CategoriesService.js';
    export default {
        name: "LecturePage",
        components: {
            CategoryArticles
        },
        methods: {
            async getData() {
                try {
                    this.isLoading = true;
                    const response = await CategoriesService.getCategories();
                    console.log(response);
                } catch (error) {
                    console.error(error);
                } finally {
                    this.isLoading = false;
                }
            }
        },
        beforeMount() {
            document.title = "База знаний | Logos";
            /* this.getData(); */
        },
        data () {
            
            return {
                isLoading: false,
                categories: [
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: 'philosofia'
                    },
                    
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
.categories__none {
    padding: 20px;
    border: 1px solid var(--color-blue);
    border-radius: 5px;
    background-color: var(--color-white);
    font-size: 18px;
}
</style>