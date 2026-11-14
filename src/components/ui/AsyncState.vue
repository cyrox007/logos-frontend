<template>
    <div
        class="async-state"
        :class="'async-state--' + type"
        :role="type === 'error' ? 'alert' : 'status'"
    >
        <span class="async-state__symbol" aria-hidden="true">{{
            type === 'error' ? '!' : '✦'
        }}</span>
        <h3>{{ title }}</h3>
        <p v-if="message">{{ message }}</p>
        <button
            v-if="actionLabel"
            type="button"
            class="button button--outline"
            @click="$emit('action')"
        >
            {{ actionLabel }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'AsyncState',
    props: {
        type: { type: String, default: 'empty' },
        title: { type: String, required: true },
        message: { type: String, default: '' },
        actionLabel: { type: String, default: '' }
    },
    emits: ['action']
};
</script>
