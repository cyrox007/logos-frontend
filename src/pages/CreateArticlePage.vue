<template>
    <section class="create-article-page">
        <div class="container" style="margin-top: 40px;">
            <h1>Создать новую статью</h1>
        </div>
        <div class="container create-article-page__wrapper">
            <div class="create-article-page__form">
                <textarea name="anons" id="" cols="30" rows="10" class="create-article-page__anons" placeholder="Введите аннотацию к статье"></textarea>
            </div>
            <div class="create-article-page__form">
                <input type="text" name="keyword" id="keyword" class="create-article-page__keyword" placeholder="Введите ключевые слова">
            </div>        
            
            <div class="create-article-page__form">
                <EditorJS :config="config" :initialized="onInitialized" />
            </div>
            
            <div class="" style="margin-top: 40px;">
                <FormButton btnType="button" btnText="Save" :btnFunc="saveArticle" />
            </div>
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
        List, Header,
        EditorJS, FormButton
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
                placeholder: "Введите текст статьи",
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

.create-article-page__wrapper {
    display: flex;
    flex-direction: column;
}
.create-article-page__form {
    margin-top: 40px;
    border: 1px solid var(--color-blue);
    background-color: var(--color-white);
    box-shadow: 0 4px 15px -12px var(--color-black);
}
.create-article-page__keyword {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    border: none;
}
.create-article-page__anons {
    width: 100%;
    padding: 15px;
    border: none;
}
</style>