<template>
    <main>
        <section class="home-hero">
            <div class="container home-hero__inner">
                <span class="eyebrow">Независимая тематическая витрина</span>
                <h1>{{ brandName }}</h1>
                <p>{{ description }}</p>
                <router-link class="primary-link" :to="{ name: 'lecture' }">
                    Перейти к материалам
                </router-link>
            </div>
        </section>

        <section class="home-latest">
            <div class="container">
                <div class="section-heading">
                    <div>
                        <span class="eyebrow">Последнее</span>
                        <h2>Новые публикации</h2>
                    </div>
                    <router-link :to="{ name: 'lecture' }">Все рубрики →</router-link>
                </div>

                <div v-if="isLoading" class="state-card">Загружаем публикации…</div>
                <div v-else-if="error" class="state-card state-card--error">{{ error }}</div>
                <div v-else-if="posts.length === 0" class="state-card">
                    Пока нет опубликованных материалов.
                </div>
                <LastArticles v-else :posts="posts" />
            </div>
        </section>
    </main>
</template>

<script>
import LastArticles from '@/components/Articles/LastArticles.vue';
import PublicContentService from '@/API/PublicContentService';

export default {
    name: 'MainPage',
    components: {
        LastArticles
    },
    data() {
        return {
            isLoading: true,
            error: '',
            site: null,
            posts: []
        };
    },
    computed: {
        brandName() {
            return this.site?.settings?.brand?.name || this.site?.name || 'λόγος';
        },
        description() {
            return this.site?.settings?.seo?.description || 'Публикации и материалы.';
        }
    },
    async created() {
        document.title = 'Logos';
        try {
            const response = await PublicContentService.getBootstrap(9);
            this.site = response.data.site;
            this.posts = response.data.latest_publications || [];
            const seo = this.site?.settings?.seo || {};
            document.title = seo.title || `${this.site?.name || 'Logos'} | Главная`;
            const description = document.querySelector('meta[name="description"]');
            if (description && seo.description) {
                description.content = seo.description;
            }
        } catch (error) {
            console.error(error);
            this.error = 'Не удалось загрузить материалы. Попробуйте обновить страницу.';
        } finally {
            this.isLoading = false;
        }
    }
};
</script>

<style>
.home-hero {
    padding: 72px 0 42px;
}
.home-hero__inner {
    max-width: 850px;
    text-align: left;
}
.home-hero h1 {
    margin: 10px 0 18px;
    font-size: clamp(46px, 10vw, 96px);
    line-height: .95;
    letter-spacing: -.05em;
}
.home-hero p {
    max-width: 720px;
    color: var(--color-text-muted);
    font-size: clamp(18px, 2.5vw, 23px);
    line-height: 1.6;
}
.primary-link {
    width: fit-content;
    margin-top: 28px;
    padding: 12px 18px;
    display: inline-flex;
    border-radius: 999px;
    background: var(--color-accent);
    color: white;
    font-weight: 700;
    text-decoration: none;
}
.home-latest {
    padding: 32px 0 80px;
}
.section-heading {
    margin-bottom: 24px;
    display: flex;
    gap: 20px;
    align-items: end;
    justify-content: space-between;
    text-align: left;
}
.section-heading h2 {
    margin-top: 6px;
    font-size: clamp(28px, 4vw, 42px);
}
.section-heading a {
    color: var(--color-accent);
    text-decoration: none;
    font-weight: 700;
}
.eyebrow {
    color: var(--color-accent);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
}
.state-card {
    padding: 28px;
    border: 1px solid var(--color-border);
    border-radius: 18px;
    background: var(--color-surface);
    color: var(--color-text-muted);
    text-align: left;
}
.state-card--error {
    color: #a33a3a;
}
@media (max-width: 620px) {
    .home-hero {
        padding-top: 48px;
    }
    .section-heading {
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
