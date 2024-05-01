<template>
    <section class="create-article-page">
        <div class="container" style="margin-top: 40px;">
            <h1>Создать новую статью</h1>
        </div>
        <div class="container create-article-page__wrapper">
            <EditorJS :config="config" :initialized="onInitialized" />
            <FormButton btnText="Save" :btnFunc="saveArticle" />
        </div>
    </section>
</template>

<script>
import EditorJS from "@/components/UI/EditorJS";
import FormButton from "@/components/UI/FormButton"
import List from '@editorjs/list';
import Header from "@editorjs/header";

export default {
    name: "CreateArticlePage",
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
                onSave: ()=>{},
                data: {}
            }
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