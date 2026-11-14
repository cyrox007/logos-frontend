<template>
    <label class="search-field">
        <span aria-hidden="true">⌕</span>
        <input
            type="search"
            :value="modelValue"
            :placeholder="placeholder"
            :aria-label="label"
            @input="$emit('update:modelValue', $event.target.value)"
        >
    </label>
</template>

<script>
export default {
    name: 'SearchField',
    props: {
        modelValue: { type: String, default: '' },
        placeholder: { type: String, required: true },
        label: { type: String, required: true }
    },
    emits: ['update:modelValue']
};
</script>
