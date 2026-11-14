<template>
    <div class="article-sheet__reading">
        <!-- HTML публикации должен быть очищен на стороне JSInteractive до передачи публичному API. -->
        <div ref="contentRoot" class="article-sheet__content" v-html="html"></div>
    </div>
</template>

<script>
import { buildArticleToc } from '@/domain/toc.mjs';
export default {
    name: 'ArticleContent',
    props: { html: { type: String, default: '' } },
    methods: {
        buildToc() {
            return buildArticleToc(this.$refs.contentRoot);
        }
    }
};
</script>
