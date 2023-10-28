<template>
    <section class="login">
        <div class="container">
            <div class="login__wrapper">
                <h1 class="login--title">Форма авторизации</h1>
                <form action="" method="post" class="login__form">
                    <!--  -->
                    <input type="hidden" id="iphash" name="ip-hash" :value="csrf.iphash">
                    <input type="hidden" id="request-tokent" name="request-tokent" :value="csrf.requestToken">
                    <input type="hidden" id="sig" name="sig" :value="csrf.sig"> 
                    <!--  -->
                    <div class="login__form_row" id="">
                        <p class="login__form_label">Email или Телефон</p>
                        <input type="email" name="login" id="login" class="login__form_input">
                    </div>
                    <div class="login__form_row" id="">
                        <p class="login__form_label">Пароль</p>
                        <input type="password" name="password" id="password" class="login__form_input">
                    </div>
                    <button type="submit" @click="sendData">Войти</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
    import AuthService from '@/API/AuthService'
    import hashMethods from '@/utils/hashMethods'
    export default {
        name: "LoginPage",
        components: {},
        props: {},
        methods: {
            definition_login_entity (fieldValue) {
                const validatePhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
                const validateEmailRegex = /^\S+@\S+\.\S+$/;
                if (validatePhone.test(fieldValue)) {
                    return 'phone';
                } else if (validateEmailRegex.test(fieldValue)) {
                    return 'email';
                } else {
                    return false;
                }
            },
            async sendData(event){
                event.preventDefault();
                if (!this.definition_login_entity(document.getElementById("login").value)) {
                    return;
                }
                let data = {
                    requestToken: document.getElementById("request-tokent").value,
                    iphash: document.getElementById("iphash").value,
                    sig: document.getElementById("sig").value,

                    login: document.getElementById("login").value,
                    loginType: this.definition_login_entity(document.getElementById("login").value),
                    password: hashMethods.passwordToHash(document.getElementById("password").value),
                };
                try {
                    let response = await AuthService.login(data);
                    console.log(response);
                } catch (error) {
                    console.log(error);
                }
            },
            async getToken () {
                try {
                    let response = await AuthService.getLoginToken().then(result=>result);
                    this.csrf = response.data;
                } catch (error) {
                    console.error(error);
                }
            }
        },
        data(){
            this.getToken();
            return {
                csrf: {}
            };
        }
    }
</script>

<style>

.login {
    width: 100%;
    margin: 40px 0;
    padding: 40px 0;
    background-color: var(--color-white);
}

.login__wrapper {
    width: 100%;
}

.login--title {
    text-align: center;
}

.login__form {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.login__form_row {
    text-align: left;
  flex: 1 1 100%;
  margin-bottom: 15px;
}

.login__form_input {
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

.login__form_input:focus {
  border-color: var(--color-blue);
}

.login__form button {
  margin-top: 15px;
  padding: 12px;
  background-color: #007bff;
  border: 1px solid transparent;
  border-color: #007bff;
  border-radius: 8px;
  color: var(--color-white);
  transition: background 0.15s ease-in-out;
}
.login__form button:hover {
  background: #0069d9;
  border-color: #0069d9;
}
.login__form button:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

</style>