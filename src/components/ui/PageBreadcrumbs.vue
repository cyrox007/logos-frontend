<template>
    <nav class="breadcrumbs" aria-label="Навигационная цепочка">
        <template v-for="(item, index) in items" :key="index">
            <span v-if="index > 0" class="breadcrumbs__separator" aria-hidden="true">/</span>
            <router-link v-if="item.to" :to="item.to">{{ item.label }}</router-link>
            <span v-else aria-current="page">{{ item.label }}</span>
        </template>
    </nav>
</template>

<script>
export default {
    name: 'PageBreadcrumbs',
    props: {
        items: { type: Array, required: true }
    }
};
</script>
