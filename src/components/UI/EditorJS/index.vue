<template>
    <div :id="config?.holder || holder" class="editor"></div>
</template>
<!--<script>
/* import { defineComponent, onMounted, onBeforeUnmount, PropType, ref, Ref } from 'vue'
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import LinkTool from "@editorjs/link";
import RawTool from "@editorjs/raw";

import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker"; */
/* export default {
    name: "EditorJS",
    props: {
        config: Object,
        holder: {
            type: String,
            default: () => 'codex-editor',
            required: false
        },
        autofocus: {
            type: Boolean,
            default: () => false,
            required: false
        },
        initialBlock: String,
        placeholder: {
            type: String,
            default: () => 'Let`s write an awesome story!',
            required: false
        },
        sanitizer: Object,
        hideToolbar: {
            type: Boolean,
            default: () => false,
            required: false
        },
        data: {
            type: Object,
            default: () => { },
            required: false
        },
        tools: {
            type: Object,
            default: () => {
                return {
                    header: {
                        class: Header,
                        inlineToolbar: true,
                        config: {
                            placeholder: 'Enter a header',
                            levels: [2, 3, 4],
                            defaultLevel: 2
                        }
                    },
                    link: {
                        class: LinkTool,
                        inlineToolbar: true,
                        config: {
                            endpoint: `${process.env.VUE_APP_SERVER}/api/v1/editor/fetchURL`,
                        }
                    },
                    raw: {
                        class: RawTool
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: `${process.env.VUE_APP_SERVER}/api/v1/editor/images/uploadFile`,
                                byUrl: `${process.env.VUE_APP_SERVER}/api/v1/editor/images/fetchUrl`,
                            }
                        }
                    },
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                        config: {
                            defaultStyle: 'unordered'
                        }
                    },
                    embed: {
                        class: Embed
                    },
                    quote: {
                        class: Quote,
                        inlineToolbar : true
                    },
                    Marker: {
                        class: Marker,
                        shortcut: 'CMD+SHIFT+M',
                    }
                }
            },
            required: false
        },
        minHeight: Number,
        logLevel: String,
        readOnly: Boolean,
        i18n: Object,
        inlineToolbar: Array,
        tunes: Array,
    },
    setup(props, context) {
        const editor = ref(null)
        const initEditor = () => {
            if (editor.value) {
                editor.value.isReady
                    .then(() => {
                        editor.value?.render(props.data)
                    }).catch(e => console.log(e));
            } else {
                const { config, ...otherConfig } = props
                const configuration = config || otherConfig
                editor.value = new EditorJS({
                    holder: configuration.holder || 'editorjs',
                    ...configuration,
                    onReady: () => {
                        context.emit('ready')
                    },
                    onChange: async () => {
                        const response = await editor.value?.save()
                        context.emit('change', response)
                    },
                })
            }
        }

        onMounted(() => {
            initEditor()
        })

        onBeforeUnmount(() => {
            if (editor.value) {
                editor.value.destroy();
            }
        })

        const save = async () => {
            const response = await editor.value?.save()
            context.emit('save', response)
        }
    }
} */
</script>-->

<script>
import EditorJS from '@editorjs/editorjs'
import { defineComponent, onMounted, reactive } from "vue";

export const PLUGINS = {
    header: import('@editorjs/header'),
    list: import('@editorjs/list'),
}

export default defineComponent({
    name: 'vue-editor-js',
    props: {
        holder: {
            type: String,
            default: () => 'vue-editor-js',
            require: true
        },
        config: {
            type: Object,
            default: () => ({}),
            require: true
        },
        initialized: {
            type: Function,
            default: () => { }
        }
    },
    setup: (props, context) => {
        const state = reactive({ editor: null })

        function initEditor(props) {
            destroyEditor()
            state.editor = new EditorJS({
                holder: props.holder || 'vue-editor-js',
                ...props.config
            })
            props.initialized(state.editor)
        }

        function destroyEditor() {
            if (state.editor) {
                state.editor.destroy()
                state.editor = null
            }
        }

        onMounted(_ => initEditor(props))

        return { props, state }
    },
    methods: {
        useTools(props, config) {
            const pluginKeys = Object.keys(PLUGINS)
            const tools = { ...props.customTools }

            if (pluginKeys.every(p => !props[p])) {
                pluginKeys.forEach(key => tools[key] = { class: PLUGINS[key] })
                Object.keys(config).forEach(key => {
                    if (tools[key] !== undefined && tools[key] !== null) {
                        tools[key]['config'] = config[key]
                    }
                })
                return tools
            }

            pluginKeys.forEach(key => {
                const prop = props[key]
                if (!prop) {
                    return
                }

                tools[key] = { class: PLUGINS[key] }

                if (typeof prop === 'object') {
                    const options = Object.assign({}, props[key])
                    delete options['class']
                    tools[key] = Object.assign(tools[key], options)
                }
            })

            Object.keys(config).forEach(key => {
                if (tools[key] !== undefined && tools[key] !== null) {
                    tools[key]['config'] = config[key]
                }
            })

            return tools
        }
    }
});
</script>

<style>
.editor {
    text-align: start;
}
</style>