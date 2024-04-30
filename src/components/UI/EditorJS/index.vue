<template>
    <div :id="config?.holder || holder"></div>
</template>
<script>
import { defineComponent, onMounted, onBeforeUnmount, PropType, ref, Ref } from 'vue'
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
/* import SimpleImage from "@editorjs/simple-image"; */
import ImageTool from '@editorjs/image';
import Checklist from '@editorjs/checklist';
import List from "@editorjs/list";
import Embed from '@editorjs/embed';
import Quote from '@editorjs/quote';
export default {
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
                        class: Header
                    },
                    link: {
                        class: LinkTool
                    },
                    raw: {
                        class: RawTool
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: 'http://localhost:8008/uploadFile',
                                byUrl: 'http://localhost:8008/fetchUrl',
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
                        class: Quote
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
}
</script>