<template>
    <main class="catalog-page">
        <div class="container">
            <PageBreadcrumbs :items="breadcrumbs" />
            <header class="catalog-page__header">
                <div>
                    <span class="eyebrow">Темы и направления</span>
                    <h1>Каталог <em>знаний</em></h1>
                    <p>
                        Выберите рубрику для знакомства с материалами, исследованиями и источниками.
                        Содержание каталога формируется в общей системе публикаций.
                    </p>
                </div>
                <span class="catalog-page__symbol" aria-hidden="true">λόγος</span>
            </header>

            <div class="catalog-page__toolbar">
                <div>
                    <h2>Все рубрики</h2>
                    <p v-if="!isLoading && !error" class="catalog-page__count">
                        {{ categories.length }} {{ rubricWord(categories.length) }}
                    </p>
                </div>
                <SearchField
                    v-model="query"
                    placeholder="Найти рубрику..."
                    label="Поиск по рубрикам"
                />
            </div>

            <Transition name="content-switch" mode="out-in">
                <LoadingSkeleton
                    v-if="isLoading"
                    key="loading"
                    label="Загружаем рубрики…"
                    variant="grid"
                />
                <AsyncState
                    v-else-if="error"
                    key="error"
                    type="error"
                    title="Не удалось загрузить каталог"
                    :message="error"
                    action-label="Повторить"
                    @action="loadCategories"
                />
                <CategoryArticles
                    v-else-if="filteredCategories.length"
                    key="content"
                    :categories="filteredCategories"
                />
                <AsyncState
                    v-else-if="query"
                    key="search-empty"
                    title="Рубрики не найдены"
                    :message="
                        'По запросу «' + query + '» ничего не найдено. Попробуйте другое слово.'
                    "
                    action-label="Сбросить поиск"
                    @action="query = ''"
                />
                <AsyncState
                    v-else
                    key="empty"
                    title="Каталог пока пуст"
                    message="Рубрики появятся здесь после публикации первых материалов."
                />
            </Transition>
        </div>
    </main>
</template>

<script>
import CategoryArticles from '@/components/knowledge/CategoryArticles.vue';
import PageBreadcrumbs from '@/components/ui/PageBreadcrumbs.vue';
import SearchField from '@/components/ui/SearchField.vue';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton.vue';
import AsyncState from '@/components/ui/AsyncState.vue';
import { filterByFields, russianPlural } from '@/domain/publication.mjs';
import PublicContentService from '@/API/PublicContentService';
import { applyCatalogSeo } from '@/seo';

export default {
    name: 'CatalogPage',
    emits: ['loading-change'],
    components: { CategoryArticles, PageBreadcrumbs, SearchField, LoadingSkeleton, AsyncState },
    data() {
        return {
            isLoading: true,
            error: '',
            categories: [],
            query: '',
            breadcrumbs: [{ label: 'Главная', to: { name: 'home' } }, { label: 'Каталог знаний' }]
        };
    },
    computed: {
        filteredCategories() {
            return filterByFields(this.categories, this.query, ['title', 'description']);
        }
    },
    created() {
        applyCatalogSeo();
        this.loadCategories();
    },
    methods: {
        async loadCategories() {
            this.$emit('loading-change', true);
            this.isLoading = true;
            this.error = '';
            try {
                const response = await PublicContentService.getCategories();
                this.categories = response.data.items || [];
            } catch (error) {
                console.error(error);
                this.error =
                    'Не удалось загрузить рубрики. Проверьте соединение и повторите попытку.';
            } finally {
                this.isLoading = false;
                this.$emit('loading-change', false);
            }
        },
        rubricWord(count) {
            return russianPlural(count, ['рубрика', 'рубрики', 'рубрик']);
        }
    }
};
</script>
