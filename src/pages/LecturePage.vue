<template>
    <main class="catalog-page">
        <div class="container">
            <header class="catalog-page__header">
                <span class="eyebrow">Темы</span>
                <h1>База знаний</h1>
                <p>Материалы сгруппированы по рубрикам, которыми управляет общая админка jsint-site.</p>
            </header>

            <div v-if="isLoading" class="state-card">Загружаем рубрики…</div>
            <div v-else-if="error" class="state-card state-card--error">{{ error }}</div>
            <div v-else-if="categories.length" class="catalog-page__grid">
                <CategoryArticles :categories="categories" />
            </div>
            <div v-else class="state-card">Пока нет опубликованных рубрик.</div>
        </div>
    </main>
</template>

<script>
import CategoryArticles from '@/components/Articles/CategoryArticles.vue';
import PublicContentService from '@/API/PublicContentService';

export default {
    name: 'LecturePage',
    components: {
        CategoryArticles
    },
    data() {
        return {
            isLoading: true,
            error: '',
            categories: []
        };
    },
    async created() {
        document.title = 'База знаний | Logos';
        try {
            const response = await PublicContentService.getCategories();
            this.categories = response.data.items || [];
        } catch (error) {
            console.error(error);
            this.error = 'Не удалось загрузить рубрики.';
        } finally {
            this.isLoading = false;
        }
    }
};
</script>

<style>
.catalog-page {
    padding: 56px 0 80px;
}
.catalog-page__header {
    max-width: 760px;
    margin-bottom: 30px;
    text-align: left;
}
.catalog-page__header h1 {
    margin: 8px 0 14px;
    font-size: clamp(36px, 6vw, 58px);
}
.catalog-page__header p {
    color: var(--color-text-muted);
    font-size: 18px;
    line-height: 1.6;
}
.catalog-page__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
}
@media (max-width: 900px) {
    .catalog-page__grid {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 620px) {
    .catalog-page__grid {
        grid-template-columns: 1fr;
    }
}
</style>
