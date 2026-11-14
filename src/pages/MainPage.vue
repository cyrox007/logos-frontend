<template>
    <main>
        <section class="home-hero">
            <div class="container home-hero__layout">
                <div class="home-hero__content">
                    <span class="eyebrow">Библиотека знаний и исследований</span>
                    <h1>Знание начинается <em>с вопроса.</em></h1>
                    <p>Logos — пространство для изучения истории, культуры, философии и других областей знания. Здесь встречаются справочные материалы, источники и самостоятельные исследования.</p>
                    <div class="home-hero__actions">
                        <router-link class="button button--primary" :to="{ name: 'lecture' }">Открыть каталог <span aria-hidden="true">↗</span></router-link>
                        <a class="button button--outline" href="#principles">О проекте</a>
                    </div>
                </div>
                <div class="home-hero__art" aria-hidden="true">
                    <div class="home-hero__seal">
                        <span class="home-hero__seal-kicker">Знания · Источники · Исследования</span>
                        <span class="home-hero__seal-logo">λόγος</span>
                        <span class="home-hero__seal-rule"></span>
                        <span class="home-hero__seal-caption">От вопроса — к пониманию</span>
                    </div>
                    <span class="home-hero__corner home-hero__corner--tl">✦</span>
                    <span class="home-hero__corner home-hero__corner--br">✦</span>
                </div>
            </div>
            <div class="container home-hero__footnote">
                <span>Открывать. Изучать. Осмыслять.</span>
                <span class="home-hero__footnote-line"></span>
                <span>LOGOS / БИБЛИОТЕКА ЗНАНИЙ</span>
            </div>
        </section>

        <section class="home-section home-categories" aria-labelledby="home-categories-title">
            <div class="container">
                <div class="section-heading">
                    <div class="section-heading__lead">
                        <span class="eyebrow">Навигация по знаниям</span>
                        <h2 id="home-categories-title" class="section-title">Откройте свою тему</h2>
                        <p class="section-heading__description">Материалы собраны по рубрикам: от первого знакомства с темой до подробного изучения источников.</p>
                    </div>
                    <router-link class="text-link" :to="{ name: 'lecture' }">Все рубрики <span aria-hidden="true">↗</span></router-link>
                </div>
                <div v-if="categoriesLoading" class="state-card" role="status">Загружаем рубрики…</div>
                <div v-else-if="categoriesError" class="state-card state-card--error" role="alert">{{ categoriesError }}</div>
                <div v-else-if="categories.length" class="home-categories__grid">
                    <CategoryArticles :categories="categories.slice(0, 6)" />
                </div>
                <div v-else class="state-card">Рубрики пока готовятся к публикации.</div>
            </div>
        </section>

        <section class="home-section home-latest" aria-labelledby="home-latest-title">
            <div class="container">
                <div class="section-heading">
                    <div class="section-heading__lead">
                        <span class="eyebrow">Новые материалы</span>
                        <h2 id="home-latest-title" class="section-title">Последние публикации</h2>
                        <p class="section-heading__description">Статьи, размышления и исследования, добавленные в библиотеку.</p>
                    </div>
                    <router-link class="text-link" :to="{ name: 'lecture' }">Перейти в каталог <span aria-hidden="true">↗</span></router-link>
                </div>
                <div v-if="postsLoading" class="state-card" role="status">Загружаем публикации…</div>
                <div v-else-if="postsError" class="state-card state-card--error" role="alert">{{ postsError }}</div>
                <LastArticles v-else-if="posts.length" :posts="posts" />
                <div v-else class="state-card">Публикации появятся здесь после выхода первых материалов.</div>
            </div>
        </section>

        <section id="principles" class="home-principles" aria-labelledby="principles-title">
            <div class="container home-principles__layout">
                <div class="home-principles__intro">
                    <span class="eyebrow">Подход к знанию</span>
                    <h2 id="principles-title" class="section-title">Важен не только ответ, но и путь к нему.</h2>
                    <p>Logos объединяет справочные знания и авторский исследовательский взгляд. Материал может стать отправной точкой для дальнейшего изучения — благодаря контексту, ссылкам и источникам.</p>
                    <router-link class="text-link" :to="{ name: 'lecture' }">Исследовать материалы <span aria-hidden="true">↗</span></router-link>
                </div>
                <div class="home-principles__list">
                    <div v-for="principle in principles" :key="principle.number" class="home-principles__item">
                        <span class="home-principles__number">{{ principle.number }}</span>
                        <div>
                            <h3>{{ principle.title }}</h3>
                            <p>{{ principle.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import CategoryArticles from '@/components/Articles/CategoryArticles.vue';
import LastArticles from '@/components/Articles/LastArticles.vue';
import PublicContentService from '@/API/PublicContentService';
import { applyHomeSeo } from '@/seo';

export default {
    name: 'MainPage',
    components: { CategoryArticles, LastArticles },
    data() {
        return {
            categoriesLoading: true,
            postsLoading: true,
            categoriesError: '',
            postsError: '',
            categories: [],
            posts: [],
            principles: [
                { number: '01', title: 'Системность', description: 'Каждый материал занимает своё место среди тем и взаимосвязей.' },
                { number: '02', title: 'Работа с источниками', description: 'Библиография и первичные материалы помогают проследить основания выводов.' },
                { number: '03', title: 'Самостоятельное исследование', description: 'Наблюдения, сопоставления и гипотезы открыты для внимательного осмысления.' }
            ]
        };
    },
    async created() {
        applyHomeSeo();
        await Promise.all([this.loadCategories(), this.loadPosts()]);
    },
    methods: {
        async loadCategories() {
            try {
                const response = await PublicContentService.getCategories();
                this.categories = response.data.items || [];
            } catch (error) {
                console.error(error);
                this.categoriesError = 'Не удалось загрузить рубрики. Попробуйте обновить страницу.';
            } finally {
                this.categoriesLoading = false;
            }
        },
        async loadPosts() {
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

<style>
.home-hero { position: relative; overflow: hidden; padding: 66px 0 0; background: radial-gradient(circle at 85% 0%, #e5f3e6 0%, transparent 43%), linear-gradient(135deg, #fbfcf8 4%, #f0f6ed 100%); }
.home-hero__layout { min-height: 510px; display: grid; grid-template-columns: 1.08fr .92fr; align-items: center; gap: 65px; }
.home-hero__content { position: relative; z-index: 1; padding: 32px 0 50px; }
.home-hero h1 { max-width: 660px; margin: 24px 0 23px; font-size: clamp(55px, 6.1vw, 91px); line-height: 1.02; letter-spacing: -.058em; }
.home-hero h1 em { color: var(--color-accent); font-weight: 400; }
.home-hero__content > p { max-width: 575px; color: #536b5d; font-size: clamp(16px, 1.6vw, 19px); line-height: 1.85; }
.home-hero__actions { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 33px; }
.home-hero__art { position: relative; aspect-ratio: 1; display: grid; place-items: center; max-width: 510px; width: 100%; margin-left: auto; border: 1px solid rgba(174,135,69,.36); border-radius: 50%; background: radial-gradient(circle at 50% 45%, rgba(255,255,255,.82), rgba(214,234,211,.22) 62%, transparent 72%); }
.home-hero__art::before { content: ""; position: absolute; inset: 18px; border: 1px solid rgba(174,135,69,.29); border-radius: 50%; }
.home-hero__art::after { content: ""; position: absolute; inset: 44px; border: 1px dashed rgba(38,127,93,.23); border-radius: 50%; }
.home-hero__seal { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; }
.home-hero__seal-kicker { color: var(--color-accent-dark); font-size: 10px; font-weight: 700; letter-spacing: .15em; text-transform: uppercase; }
.home-hero__seal-logo { margin: 8px 0 18px; color: var(--color-accent-dark); font: italic clamp(76px, 9vw, 132px)/1.2 var(--font-display); letter-spacing: -.06em; }
.home-hero__seal-rule { width: 72px; height: 1px; background: var(--color-gold); }
.home-hero__seal-caption { margin-top: 22px; color: var(--color-text-muted); font: italic 17px var(--font-display); }
.home-hero__corner { position: absolute; z-index: 1; color: var(--color-gold); font-size: 33px; }
.home-hero__corner--tl { top: 8%; left: 12%; }
.home-hero__corner--br { right: 12%; bottom: 8%; }
.home-hero__footnote { display: flex; align-items: center; gap: 24px; padding: 21px 0; border-top: 1px solid rgba(38,127,93,.15); color: var(--color-text-muted); font-size: 10px; font-weight: 700; letter-spacing: .17em; text-transform: uppercase; }
.home-hero__footnote-line { flex: 1; height: 1px; background: rgba(38,127,93,.17); }
.home-section { padding: 100px 0; }
.home-categories__grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 18px; }
.home-latest { background: #f0f5ee; }
.home-principles { scroll-margin-top: 110px; padding: 98px 0 110px; background: #fff; }
.home-principles__layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(35px,7vw,120px); }
.home-principles__intro { display: flex; flex-direction: column; align-items: start; gap: 20px; }
.home-principles__intro p { color: var(--color-text-muted); }
.home-principles__list { border-top: 1px solid var(--color-border); }
.home-principles__item { display: grid; grid-template-columns: 44px 1fr; gap: 24px; padding: 27px 0; border-bottom: 1px solid var(--color-border); }
.home-principles__number { padding-top: 5px; color: var(--color-gold); font: 23px var(--font-display); }
.home-principles__item h3 { margin-bottom: 8px; font: 500 28px var(--font-display); }
.home-principles__item p { color: var(--color-text-muted); font-size: 14px; }
@media (max-width: 1050px) { .home-hero__layout { gap: 28px; } .home-hero h1 { font-size: clamp(49px, 6.7vw, 78px); } }
@media (max-width: 800px) { .home-hero__layout { grid-template-columns: 1fr; min-height: auto; } .home-hero__content { padding-bottom: 0; } .home-hero__art { max-width: 390px; margin: 5px auto 38px; } .home-categories__grid { grid-template-columns: repeat(2, minmax(0,1fr)); } .home-principles__layout { grid-template-columns: 1fr; } }
@media (max-width: 550px) { .home-hero { padding-top: 34px; } .home-hero h1 { font-size: clamp(47px, 12vw, 68px); } .home-hero__art { max-width: 315px; } .home-hero__seal-logo { font-size: 84px; } .home-hero__seal-kicker { font-size: 8px; } .home-hero__footnote { font-size: 9px; } .home-hero__footnote span:last-child { display: none; } .home-section { padding: 66px 0; } .home-categories__grid { grid-template-columns: 1fr; } .home-principles { padding: 68px 0; } }
</style>
