<template>
    <section class="categories">
        <div class="container categories__wrapper">
            <h1>База знаний</h1>
            <div class="categories__list">
                <category-articles :categories="categories"/>
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
            document.title = "Logos | База знаний";
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
                        slug: '/philosofia'
                    },
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: '/philosofia'
                    },
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: '/philosofia'
                    },
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: '/philosofia'
                    },
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: '/philosofia'
                    },
                    {
                        uid: 'uid1',
                        name: 'Философия',
                        image: 'https://img.icons8.com/ios/100/book--v1.png',
                        slug: '/philosofia'
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

</style>