<template>
    <div class="form-input_row" :id="fieldBlockName">
        <label :for="fieldName" class="form-input_label">{{ fieldTitle }} <span v-show="required">*</span></label>
        <input class="form-input_input"
            :type="fieldType" 
            :name="fieldName" 
            :id="fieldId" 
            :change="fueldFunc"
            :value="fieldValue" :required="required">
        <span id="er"></span>
    </div>
</template>

<script>
export default {
    name: "FormInput",
    props: {
        fieldBlockName: { type: String },
        fieldType: { type: String, default: 'text' },
        fieldName: { type: String },
        fieldId: { type: String },
        fieldTitle: { type: String },
        
        fieldFunc: { type: Function, default: null },
        fieldValue: { type: [String, Number], default: '' },
        required: {type: Boolean, default: false}
    },
    data() {
        return {}
    }
}
</script>

<style>
:root {
    --form-bg: #D9D9D9;
    --form-border-color: #DAE2EB;
    --form-border-color-focus: #157fc4;
}

/* .form-input_row {
    text-align: left;
    flex: 1 1 100%;
}

.form-input_label {
    font-size: 20px;
    font-weight: 500;
    line-height: 26px;
    color: white;
}

.form-input_input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    background-color: var(--form-bg);
    outline: none;
    border: 2px solid transparent;
    border-color: var(--form-border-color);
    transition: border-color 0.15s ease-in-out;
}

.form-input_input:focus {
    border-color: var(--form-border-color-focus);
} */

.form-input_row {
    text-align: left;
    flex: 1 1 100%;
    margin-bottom: 15px;
}

.form-input_label span {
    color: #dc3545;
}

.form-input_input {
    width: 100%;
    height: 50px;
    padding: 0 15px;
    background-color: #F5F8FA;
    outline: none;
    border: 1px solid transparent;
    border-color: #DAE2EB;
    border-radius: 8px;
    transition: border-color 0.15s ease-in-out;
}

.form-input_input:focus {
    border-color: var(--color-blue);
}

.form-input_input.error {
    border-color: #dc3545;
}

.form-input_input.currect {
    border-color: #28a745;
}
</style>