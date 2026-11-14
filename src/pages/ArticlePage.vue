<template>
    <main class="article-page">
        <div class="container">
            <nav class="breadcrumbs" aria-label="Навигационная цепочка">
                <router-link :to="{ name: 'home' }">Главная</router-link>
                <span class="breadcrumbs__separator" aria-hidden="true">/</span>
                <router-link :to="{ name: 'lecture' }">Каталог знаний</router-link>
                <span class="breadcrumbs__separator" aria-hidden="true">/</span>
                <router-link :to="{ name: 'category', params: { catName: categorySlug } }">{{ categoryTitle }}</router-link>
                <span class="breadcrumbs__separator" aria-hidden="true">/</span>
                <span aria-current="page">{{ article?.title || 'Материал' }}</span>
            </nav>

            <div v-if="isLoading" class="state-card" role="status">Загружаем материал…</div>
            <div v-else-if="error" class="state-card state-card--error" role="alert">{{ error }}</div>

            <div v-else-if="article" class="article-page__layout">
                <article class="article-sheet">
                    <header class="article-sheet__header">
                        <span class="eyebrow">{{ categoryTitle }}</span>
                        <h1>{{ article.title }}</h1>
                        <p v-if="articleLead" class="article-sheet__lead">{{ articleLead }}</p>
                        <div class="article-sheet__metadata">
                            <span v-if="profile.speaker"><strong>Автор</strong> {{ profile.speaker }}</span>
                            <time v-if="article.published_at" :datetime="article.published_at"><strong>Опубликовано</strong> {{ formatDate(article.published_at) }}</time>
                            <span v-if="readingMinutes"><strong>Чтение</strong> ≈ {{ readingMinutes }} мин</span>
                        </div>
                        <div v-if="keywords.length" class="article-sheet__keywords" aria-label="Ключевые слова">
                            <span v-for="keyword in keywords" :key="keyword" class="article-sheet__keyword">{{ keyword }}</span>
                        </div>
                    </header>

                    <div class="article-sheet__reading">
                        <div ref="articleContent" class="article-sheet__content" v-html="article.content"></div>
                    </div>

                    <section v-if="bibliography.length" class="article-sheet__bibliography" aria-labelledby="bibliography-heading">
                        <span class="eyebrow">Для дальнейшего изучения</span>
                        <h2 id="bibliography-heading">Источники и литература</h2>
                        <ol>
                            <li v-for="(item, index) in bibliography" :key="index">{{ item }}</li>
                        </ol>
                    </section>

                    <div class="article-sheet__return">
                        <router-link class="text-link" :to="{ name: 'category', params: { catName: categorySlug } }">
                            ← Вернуться к материалам рубрики
                        </router-link>
                    </div>
                </article>

                <aside class="article-aside" aria-label="Навигация по материалу">
                    <div v-if="tocItems.length" class="article-aside__panel">
                        <span class="article-aside__eyebrow">В этом материале</span>
                        <nav aria-label="Оглавление статьи">
                            <a
                                v-for="item in tocItems"
                                :key="item.id"
                                :href="'#' + item.id"
                                :class="{ 'article-aside__subitem': item.level === 3 }"
                            >{{ item.title }}</a>
                        </nav>
                    </div>
                    <div class="article-aside__panel article-aside__panel--context">
                        <span class="article-aside__eyebrow">Библиотека Logos</span>
                        <p>Изучайте смежные темы и материалы, сгруппированные по рубрикам.</p>
                        <router-link class="text-link" :to="{ name: 'lecture' }">Каталог знаний <span aria-hidden="true">↗</span></router-link>
                    </div>
                </aside>
            </div>
        </div>
    </main>
</template>

<script>
import PublicContentService from '@/API/PublicContentService';
import { applyArticleSeo } from '@/seo';

export default {
    name: 'ArticlePage',
    data() {
        return { isLoading: true, error: '', article: null, tocItems: [] };
    },
    computed: {
        profile() {
            const envelope = this.article?.data;
            if (
                !envelope ||
                envelope.version !== 1 ||
                !['logos.article', 'logos.lecture'].includes(envelope.schema) ||
                typeof envelope.data !== 'object' ||
                envelope.data === null
            ) return {};
            return envelope.data;
        },
        categorySlug() { return this.article?.category?.slug || this.$route.params.catName; },
        categoryTitle() { return this.article?.category?.title || 'Материал'; },
        articleLead() { return this.profile.abstract || this.article?.excerpt || ''; },
        keywords() { return Array.isArray(this.profile.keywords) ? this.profile.keywords : []; },
        bibliography() { return Array.isArray(this.profile.bibliography) ? this.profile.bibliography : []; },
        readingMinutes() {
            if (!this.article?.content) return 0;
            const plainText = this.article.content.replace(/<[^>]*>/g, ' ').trim();
            const words = plainText.split(/\s+/).filter(Boolean).length;
            return words ? Math.max(1, Math.ceil(words / 180)) : 0;
        }
    },
    watch: {
        '$route.params.slug'() { this.loadArticle(); }
    },
    created() { this.loadArticle(); },
    methods: {
        async loadArticle() {
            const slug = this.$route.params.slug;
            this.isLoading = true;
            this.article = null;
            this.tocItems = [];
            this.error = '';
            try {
                const response = await PublicContentService.getPublication(slug);
                if (slug !== this.$route.params.slug) return;
                this.article = response.data.item;
                applyArticleSeo(this.article);
            } catch (error) {
                if (slug !== this.$route.params.slug) return;
                console.error(error);
                this.error = error?.response?.status === 404
                    ? 'Материал не найден.'
                    : 'Не удалось загрузить материал.';
            } finally {
                if (slug === this.$route.params.slug) {
                    this.isLoading = false;
                    await this.$nextTick();
                    this.buildToc();
                }
            }
        },
        buildToc() {
            const root = this.$refs.articleContent;
            if (!root) return;
            const used = new Set(Array.from(root.querySelectorAll('[id]')).map(node => node.id));
            this.tocItems = Array.from(root.querySelectorAll('h2, h3')).map((heading, index) => {
                const title = (heading.textContent || '').trim();
                let id = heading.id;
                if (!id) {
                    const base = title.toLocaleLowerCase('ru-RU')
                        .replace(/[^a-zа-яё0-9]+/gi, '-')
                        .replace(/^-|-$/g, '') || 'razdel';
                    id = base;
                    let attempt = 2;
                    while (used.has(id)) id = base + '-' + attempt++;
                    heading.id = id;
                    used.add(id);
                }
                return { id, title, level: Number(heading.tagName.slice(1)), key: index };
            }).filter(item => item.title);
        },
        formatDate(value) {
            const date = new Date(value);
            return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('ru-RU', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(date);
        }
    }
};
</script>

<style>
.article-page { padding: 40px 0 100px; }
.article-page__layout { display: grid; grid-template-columns: minmax(0, 1fr) 255px; align-items: start; gap: 36px; }
.article-sheet { min-width: 0; overflow: hidden; border: 1px solid var(--color-border); border-radius: 13px; background: var(--color-surface); box-shadow: var(--shadow-soft); }
.article-sheet__header { padding: clamp(28px,5vw,65px); background: linear-gradient(145deg, #f1f8ee, #fff 80%); border-bottom: 1px solid var(--color-border); }
.article-sheet__header h1 { margin: 20px 0 24px; max-width: 830px; font-size: clamp(44px,5.3vw,74px); line-height: 1.08; letter-spacing: -.047em; overflow-wrap: anywhere; }
.article-sheet__lead { color: #506a5c; font: 20px/1.7 var(--font-display); }
.article-sheet__metadata { display: flex; flex-wrap: wrap; gap: 10px 25px; margin-top: 29px; color: var(--color-text-muted); font-size: 13px; }
.article-sheet__metadata strong { display: block; margin-bottom: 4px; color: var(--color-accent-dark); font-size: 10px; letter-spacing: .09em; text-transform: uppercase; }
.article-sheet__keywords { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
.article-sheet__keyword { padding: 6px 10px; border: 1px solid #cfe4d1; border-radius: 6px; background: #eaf6ec; color: var(--color-accent-dark); font-size: 12px; }
.article-sheet__reading { padding: clamp(26px,5vw,65px); }
.article-sheet__content { max-width: 720px; font: 18px/1.85 var(--font-display); overflow-wrap: break-word; }
.article-sheet__content > * + * { margin-top: 1.2em; }
.article-sheet__content h2, .article-sheet__content h3 { scroll-margin-top: 115px; color: var(--color-text); line-height: 1.24; letter-spacing: -.025em; }
.article-sheet__content h2 { margin-top: 1.7em; font-size: clamp(29px,3.4vw,39px); }
.article-sheet__content h3 { margin-top: 1.5em; font-size: clamp(24px,2.7vw,29px); }
.article-sheet__content p { line-height: 1.86; }
.article-sheet__content a { color: var(--color-accent-dark); text-decoration-color: #a6cbb1; text-underline-offset: 4px; }
.article-sheet__content a:hover { text-decoration-color: var(--color-accent); }
.article-sheet__content blockquote { margin: 30px 0; padding: 13px 25px; border-left: 3px solid var(--color-gold); background: #f8faf5; color: #466451; font-style: italic; }
.article-sheet__content img { display: block; max-width: 100%; height: auto; margin: 26px auto; border-radius: 8px; }
.article-sheet__content figure { margin: 30px 0; }
.article-sheet__content figcaption { margin-top: 10px; color: var(--color-text-muted); font: 13px/1.5 var(--font-body); text-align: center; }
.article-sheet__content ul, .article-sheet__content ol { padding-left: 1.6em; }
.article-sheet__content li + li { margin-top: .4em; }
.article-sheet__content hr { margin: 33px 0; border: 0; border-top: 1px solid var(--color-border); }
.article-sheet__content pre { overflow: auto; max-width: 100%; padding: 18px; border-radius: 9px; background: #eff4ef; font: 13px/1.5 monospace; }
.article-sheet__content code { overflow-wrap: anywhere; font: .88em monospace; }
.article-sheet__content table { display: block; max-width: 100%; overflow-x: auto; border-collapse: collapse; font: 14px var(--font-body); }
.article-sheet__content td, .article-sheet__content th { padding: 10px; border: 1px solid var(--color-border); }
.article-sheet__bibliography { padding: 32px clamp(26px,5vw,65px) 44px; border-top: 1px solid var(--color-border); background: #fafcf8; }
.article-sheet__bibliography h2 { margin: 13px 0 20px; font-size: 34px; }
.article-sheet__bibliography ol { display: grid; gap: 12px; padding-left: 21px; color: var(--color-text-muted); font-size: 14px; line-height: 1.7; overflow-wrap: anywhere; }
.article-sheet__return { padding: 26px clamp(26px,5vw,65px); border-top: 1px solid var(--color-border); }
.article-aside { display: grid; gap: 16px; position: sticky; top: 115px; }
.article-aside__panel { padding: 23px; border: 1px solid var(--color-border); border-radius: 11px; background: #fff; }
.article-aside__eyebrow { display: block; margin-bottom: 18px; color: var(--color-accent-dark); font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.article-aside nav { display: grid; gap: 12px; max-height: 45vh; overflow-y: auto; }
.article-aside nav a { border-left: 2px solid #d5e4d6; padding-left: 12px; color: var(--color-text-muted); font-size: 13px; line-height: 1.5; text-decoration: none; overflow-wrap: anywhere; }
.article-aside nav a:hover { border-color: var(--color-gold); color: var(--color-accent-dark); }
.article-aside nav a.article-aside__subitem { padding-left: 22px; font-size: 12px; }
.article-aside__panel--context { background: #f0f7ef; }
.article-aside__panel--context p { margin-bottom: 20px; color: var(--color-text-muted); font-size: 13px; }
.article-aside__panel--context .text-link { font-size: 12px; }
@media (max-width: 950px) { .article-page__layout { grid-template-columns: 1fr; } .article-aside { position: static; grid-row: 1; grid-template-columns: repeat(2, minmax(0,1fr)); } .article-aside nav { max-height: 200px; } }
@media (max-width: 650px) { .article-page { padding: 25px 0 70px; } .article-aside { grid-template-columns: 1fr; } .article-aside__panel--context { display: none; } .article-sheet__header h1 { font-size: 41px; } .article-sheet__content { font-size: 17px; } .article-sheet__lead { font-size: 18px; } }
</style>
