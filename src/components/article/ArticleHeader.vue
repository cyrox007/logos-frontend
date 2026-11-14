<template>
    <header class="article-sheet__header">
        <span class="eyebrow">{{ categoryTitle }}</span>
        <h1>{{ article.title }}</h1>
        <p v-if="articleLead" class="article-sheet__lead">{{ articleLead }}</p>
        <div class="article-sheet__metadata">
            <span v-if="profile.speaker"><strong>Автор</strong> {{ profile.speaker }}</span>
            <time v-if="article.published_at" :datetime="article.published_at">
                <strong>Опубликовано</strong> {{ formatPublicationDate(article.published_at) }}
            </time>
            <span v-if="readingMinutes"><strong>Чтение</strong> ≈ {{ readingMinutes }} мин</span>
        </div>
        <div v-if="keywords.length" class="article-sheet__keywords" aria-label="Ключевые слова">
            <span v-for="keyword in keywords" :key="keyword" class="article-sheet__keyword">{{ keyword }}</span>
        </div>
    </header>
</template>

<script>
import { formatPublicationDate } from '@/domain/publication.mjs';

export default {
    name: 'ArticleHeader',
    props: {
        article: { type: Object, required: true },
        profile: { type: Object, required: true },
        categoryTitle: { type: String, required: true },
        readingMinutes: { type: Number, default: 0 }
    },
    computed: {
        articleLead() { return this.profile.abstract || this.article.excerpt || ''; },
        keywords() { return Array.isArray(this.profile.keywords) ? this.profile.keywords : []; }
    },
    methods: { formatPublicationDate }
};
</script>
