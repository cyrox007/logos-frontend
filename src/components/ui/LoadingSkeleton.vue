<template>
    <div
        class="loading-skeleton"
        :class="'loading-skeleton--' + variant"
        role="status"
        aria-live="polite"
        aria-busy="true"
    >
        <span class="sr-only">{{ label }}</span>
        <div v-if="variant === 'article'" class="loading-skeleton__article" aria-hidden="true">
            <div class="loading-skeleton__sheet">
                <div class="skeleton-line skeleton-line--short"></div>
                <div class="skeleton-line skeleton-line--heading"></div>
                <div class="skeleton-line skeleton-line--medium"></div>
                <div class="skeleton-line skeleton-line--long"></div>
                <div class="skeleton-divider"></div>
                <div
                    v-for="line in 6"
                    :key="line"
                    class="skeleton-line"
                    :class="{ 'skeleton-line--medium': line % 3 === 0 }"
                ></div>
            </div>
            <div class="loading-skeleton__aside">
                <div class="skeleton-line skeleton-line--short"></div>
                <div
                    v-for="line in 4"
                    :key="line"
                    class="skeleton-line"
                    :class="{ 'skeleton-line--medium': line % 2 === 0 }"
                ></div>
            </div>
        </div>
        <div v-else class="loading-skeleton__cards" aria-hidden="true">
            <div v-for="index in count" :key="index" class="loading-skeleton__card">
                <div class="skeleton-line skeleton-line--short"></div>
                <div class="skeleton-line skeleton-line--heading"></div>
                <div class="skeleton-line skeleton-line--long"></div>
                <div class="skeleton-line skeleton-line--medium"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoadingSkeleton',
    props: {
        variant: { type: String, default: 'grid' },
        count: { type: Number, default: 3 },
        label: { type: String, default: 'Загружаем данные…' }
    }
};
</script>
