<template>
    <div class="latest-grid">
        <article v-for="post in posts" :key="post.id" class="latest-card">
            <router-link
                class="latest-card__link"
                :to="{
                    name: 'article',
                    params: {
                        catName: post.category ? post.category.slug : 'materials',
                        slug: post.slug
                    }
                }"
            >
                <div v-if="cover(post)" class="latest-card__media">
                    <img :src="cover(post)" :alt="post.title">
                </div>
                <div v-else class="latest-card__media latest-card__media--empty" aria-hidden="true">
                    λόγος
                </div>
                <div class="latest-card__body">
                    <span class="latest-card__category">
                        {{ post.category ? post.category.title : 'Материал' }}
                    </span>
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.excerpt }}</p>
                    <span class="latest-card__more">Читать →</span>
                </div>
            </router-link>
        </article>
    </div>
</template>

<script>
export default {
    name: 'LastArticles',
    props: {
        posts: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        cover(post) {
            const data = post.extra_data || {};
            return data.cover_url || data.image_url || '';
        }
    }
};
</script>

<style>
.latest-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
}
.latest-card {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 22px;
    background: var(--color-surface);
    box-shadow: var(--shadow-soft);
}
.latest-card__link {
    height: 100%;
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
}
.latest-card__media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--color-surface-muted);
}
.latest-card__media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.latest-card__media--empty {
    display: grid;
    place-items: center;
    font-size: clamp(34px, 6vw, 68px);
    color: var(--color-accent);
}
.latest-card__body {
    padding: 22px;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 12px;
    text-align: left;
}
.latest-card__category {
    color: var(--color-accent);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .05em;
    text-transform: uppercase;
}
.latest-card__body h2 {
    font-size: 22px;
    line-height: 1.2;
}
.latest-card__body p {
    color: var(--color-text-muted);
    line-height: 1.6;
}
.latest-card__more {
    margin-top: auto;
    padding-top: 8px;
    font-weight: 700;
}
@media (max-width: 900px) {
    .latest-grid {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 620px) {
    .latest-grid {
        grid-template-columns: 1fr;
    }
}
</style>
