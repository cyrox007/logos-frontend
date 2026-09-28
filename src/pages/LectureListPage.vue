<template>
    <main class="publication-list">
        <div class="container">
            <header class="publication-list__header">
                <router-link class="back-link" :to="{ name: 'lecture' }">← Все рубрики</router-link>
                <span class="eyebrow">Рубрика</span>
                <h1>{{ categoryTitle }}</h1>
            </header>

            <div v-if="isLoading" class="state-card">Загружаем публикации…</div>
            <div v-else-if="error" class="state-card state-card--error">{{ error }}</div>
            <div v-else-if="articles.length" class="publication-list__items">
                <ArticleElement :articles="articles" />
            </div>
            <div v-else class="state-card">В этой рубрике пока нет опубликованных материалов.</div>
        </div>
    </main>
</template>

<script>
import ArticleElement from '@/components/Articles/ArticleElement.vue';
import PublicContentService from '@/API/PublicContentService';

export default {
    name: 'LectureListPage',
    components: {
        ArticleElement
    },
    data() {
        return {
            isLoading: true,
            error: '',
            categoryTitle: this.$route.params.catName,
            articles: []
        };
    },
    watch: {
        '$route.params.catName': {
            async handler() {
                await this.loadData();
            }
        }
    },
    async created() {
        await this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoading = true;
            this.error = '';
            const slug = this.$route.params.catName;
            try {
                const [categoriesResponse, publicationsResponse] = await Promise.all([
                    PublicContentService.getCategories(),
                    PublicContentService.getPublications({
                        category: slug,
                        limit: 100
                    })
                ]);
                const categories = categoriesResponse.data.items || [];
                const category = categories.find((item) => item.slug === slug);
                this.categoryTitle = category?.title || slug;
                this.articles = publicationsResponse.data.items || [];
                document.title = `${this.categoryTitle} | База знаний | Logos`;
            } catch (error) {
                console.error(error);
                this.error = 'Не удалось загрузить публикации.';
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style>
.publication-list {
    padding: 56px 0 80px;
}
.publication-list__header {
    margin-bottom: 28px;
    text-align: left;
}
.publication-list__header h1 {
    margin-top: 8px;
    font-size: clamp(34px, 6vw, 54px);
}
.publication-list__items {
    display: grid;
    gap: 14px;
}
.back-link {
    margin-bottom: 24px;
    display: block;
    color: var(--color-text-muted);
    text-decoration: none;
}
</style>
