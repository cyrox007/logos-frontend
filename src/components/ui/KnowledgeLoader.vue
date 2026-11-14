<template>
    <div class="knowledge-loader" :class="'knowledge-loader--' + variant" aria-hidden="true">
        <div class="knowledge-loader__mark">
            <svg class="knowledge-loader__glyph" viewBox="0 0 116 116" fill="none">
                <circle
                    class="knowledge-loader__ring knowledge-loader__ring--base"
                    cx="58"
                    cy="58"
                    r="43"
                />
                <circle
                    class="knowledge-loader__ring knowledge-loader__ring--trace"
                    cx="58"
                    cy="58"
                    r="43"
                />
                <circle
                    class="knowledge-loader__ring knowledge-loader__ring--orbit"
                    cx="58"
                    cy="58"
                    r="35"
                />
                <path class="knowledge-loader__ray" d="M58 2v8M58 106v8M2 58h8M106 58h8" />
            </svg>
            <span class="knowledge-loader__lambda">λ</span>
        </div>
        <div v-if="variant === 'full'" class="knowledge-loader__reveal">
            <span class="knowledge-loader__rule"></span>
            <div class="knowledge-loader__fragments">
                <span v-for="index in 3" :key="index" class="knowledge-loader__fragment">
                    <span></span>
                    <span></span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KnowledgeLoader',
    props: {
        variant: { type: String, default: 'compact' }
    }
};
</script>
