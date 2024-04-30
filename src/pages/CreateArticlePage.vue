<script setup>


</script>
<template>
    <section class="create-article-page">
        <div class="container" style="margin-top: 40px;">
            <h1>Создать новую статью</h1>
        </div>
        <div class="container create-article-page__wrapper">
            <EditorJS 
                ref="editor"
                @change="onChange"
                @save="onSave"
            />
            <FormButton 
                btnText="Save"
                :btnFunc="save"
            />
        </div>
    </section>
</template>

<script>
import EditorJS from "@/components/UI/EditorJS";
import FormButton from "@/components/UI/FormButton"
export default {
    name: "CreateArticlePage",
    components: {
        EditorJS,
        FormButton
    },
    methods: {
        onSave(data) {
            this.editor = data;
        },
        onChange(data) {
            this.editor = data;
        },
        save(){
            console.log(JSON.stringify(this.editor)); // вот и всё!!!!
        }
    },
    data() {
        return {
            editor: undefined
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