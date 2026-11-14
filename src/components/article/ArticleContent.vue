<template>
    <div class="article-sheet__reading">
        <!-- HTML публикации должен быть очищен на стороне JSInteractive до передачи публичному API. -->
        <div ref="contentRoot" class="article-sheet__content" v-html="html"></div>
    </div>
</template>

<script>
export default {
    name: 'ArticleContent',
    props: { html: { type: String, default: '' } },
    methods: {
        buildToc() {
            const root = this.$refs.contentRoot;
            if (!root) return [];
            const used = new Set(Array.from(root.querySelectorAll('[id]')).map(node => node.id));
            return Array.from(root.querySelectorAll('h2, h3'))
                .map(heading => {
                    const title = (heading.textContent || '').trim();
                    if (!title) return null;
                    let id = heading.id;
                    if (!id) {
                        const base = title.toLocaleLowerCase('ru-RU')
                            .replace(/[^a-zа-яё0-9]+/gi, '-')
                            .replace(/^-|-$/g, '') || 'razdel';
                        id = base;
                        let number = 2;
                        while (used.has(id)) id = base + '-' + number++;
                        heading.id = id;
                        used.add(id);
                    }
                    return { id, title, level: Number(heading.tagName.slice(1)) };
                })
                .filter(Boolean);
        }
    }
};
</script>
