<template>
    <section class="create-article-page">
        <div class="container" style="margin-top: 40px;">
            <h1>Редактировать статью</h1>
        </div>
        <div class="container create-article-page__wrapper">
            <EditorJS :config="config" :initialized="onInitialized" />
            <FormButton btnText="Save" :btnFunc="update" />
        </div>
    </section>
</template>

<script>
import EditorJS from "@/components/UI/EditorJS";
import FormButton from "@/components/UI/FormButton";
import List from '@editorjs/list';
import Header from "@editorjs/header";

export default {
    name: "UpdateArticlePage",
    components: {
        List,
        Header,
        EditorJS,
        FormButton
    },
    methods: {
        onInitialized(editor) {
            this.editor = editor;
        },
        async saveArticle() {
            let data = await this.editor.save();
        }
    },
    data() {
        return {
            editor: undefined,
            config: {
                tools: {
                    header: {
                        class: Header,
                        config: {
                            placeholder: 'Enter a header',
                            levels: [2, 3, 4],
                            defaultLevel: 3,
                        }
                    },
                    list: {
                        class: List,
                        inlineToolbar: true,
                    },
                },
                onReady: () => {
                },
                onChange: (args) => {
                },
                onSave: () => { },
                data: {
                    "time": 1591362820044,
                    "blocks": [
                        {
                            "type": "header",
                            "data": {
                                "text": "Editor.js",
                                "level": 2
                            }
                        },
                        {
                            "type": "paragraph",
                            "data": {
                                "text": "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text."
                            }
                        },
                        {
                            "type": "header",
                            "data": {
                                "text": "Key features",
                                "level": 3
                            }
                        },
                        {
                            "type": "list",
                            "data": {
                                "style": "unordered",
                                "items": [
                                    "It is a block-styled editor",
                                    "It returns clean data output in JSON",
                                    "Designed to be extendable and pluggable with a simple API"
                                ]
                            }
                        }
                    ],
                    "version": "2.25.0"
                }
            },
        }
    }
}
</script>

<style>
/* .create-article-page {} */

.create-article-page__wrapper {
    margin-top: 40px;
    border: 1px solid var(--color-blue);
    background-color: var(--color-white);
    box-shadow: 0 4px 15px -12px var(--color-black);
}
</style>