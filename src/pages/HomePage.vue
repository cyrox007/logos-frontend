<template>
    <main>
        <HomeHero />
        <HomeCategories
            :categories="categories"
            :categories-loading="categoriesLoading"
            :categories-error="categoriesError"
            @retry="loadCategories"
        />
        <HomeLatest
            :posts="posts"
            :posts-loading="postsLoading"
            :posts-error="postsError"
            @retry="loadPosts"
        />
        <HomePrinciples />
    </main>
</template>

<script>
import HomeHero from '@/components/home/HomeHero.vue';
import HomeCategories from '@/components/home/HomeCategories.vue';
import HomeLatest from '@/components/home/HomeLatest.vue';
import HomePrinciples from '@/components/home/HomePrinciples.vue';
import PublicContentService from '@/API/PublicContentService';
import { applyHomeSeo } from '@/seo';

export default {
    name: 'HomePage',
    components: { HomeHero, HomeCategories, HomeLatest, HomePrinciples },
    data() {
        return {
            categoriesLoading: true,
            postsLoading: true,
            categoriesError: '',
            postsError: '',
            categories: [],
            posts: []
        };
    },
    async created() {
        applyHomeSeo();
        await Promise.all([this.loadCategories(), this.loadPosts()]);
    },
    methods: {
        async loadCategories() {
            this.categoriesLoading = true;
            this.categoriesError = '';
            try {
                const response = await PublicContentService.getCategories();
                this.categories = response.data.items || [];
            } catch (error) {
                console.error(error);
                this.categoriesError =
                    'Не удалось загрузить рубрики. Попробуйте обновить страницу.';
            } finally {
                this.categoriesLoading = false;
            }
        },
        async loadPosts() {
            this.postsLoading = true;
            this.postsError = '';
            try {
                const response = await PublicContentService.getBootstrap(6);
                this.posts = response.data.latest_publications || [];
            } catch (error) {
                console.error(error);
                this.postsError = 'Не удалось загрузить публикации. Попробуйте обновить страницу.';
            } finally {
                this.postsLoading = false;
            }
        }
    }
};
</script>
