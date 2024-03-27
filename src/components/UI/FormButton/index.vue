<template>
    <div class="form-button_row" :id="btnBlockName">
        <button class="btn" :type="btnType" @click="btnFunc">
            <span v-if="isLoading" class="btn--loading"></span>
            <span v-else class="btn-text">{{ btnText }}</span>
            
        </button>
    </div>
</template>

<script>
export default {
    name: "FormButton",
    props: {
        btnBlockName: {type: String, default: 'form-btn'},
        btnText: {type: String, default: "Отправить"},
        btnType: {type: String, default: 'submit'},
        btnFunc: {type: Function},
        isLoading: { type: Boolean }
    },
    data(){
        return {
            
        }
    }
}
</script>
<style>
:root {
    --btn-bg: #007bff;
    --btn-hover-bg: #0069d9;
    --btn-border-color: #007bff;
    --btn-hover-border-color: #0069d9;
    --btn-focus-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    --btn-border-radius: 8px;
}
.form-button_row {
    flex: 1 1 100%;
    width: 100%;
}
.form-button_row button {
    cursor: pointer;
    width: 100%;
    padding: 12px;
    min-height: 45px;
    background-color: var(--btn-bg);
    border: 2px solid transparent;
    border-color: var(--btn-bg);
    
    color: white;
    transition: background 0.15s ease-in-out, border-color .15s ease-in-out;
}
.form-button_row button:hover {
    background: var(--btn-hover-bg);
    border-color: var(--btn-hover-border-color);
}
.form-button_row button:focus {
    box-shadow: var(--btn-focus-box-shadow);
}
.btn {
    position: relative;
}
.btn--loading {
    padding: 12px;
    position: absolute;
    width: 16px;
    height: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border: 4px solid transparent;
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>