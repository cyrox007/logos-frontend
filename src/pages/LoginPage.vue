<template>
	<section class="login">
		<div class="container">
			<div class="login__wrapper" style="display: flex; justify-content: center;" v-if="isLoading">
				<ContentLoader/>
			</div>
			<div class="login__wrapper" v-else>
				<h1 class="login--title">Форма авторизации</h1>
				<form action="" method="post" class="login__form">
					<FormCSRF 
                        :ipHash="csrf.ipHash"
                        :requestToken="csrf.requestToken"
                        :sig="csrf.sig"
                    />
					<div class="login__form_row" id="">
						<p class="login__form_label">Email или Телефон</p>
						<input type="email" name="login" id="login" class="login__form_input">
					</div>
					<div class="login__form_row" id="">
						<p class="login__form_label">Пароль</p>
						<input type="password" name="password" id="password" class="login__form_input">
					</div>
					<!-- <button type="submit" @click="(event)=>{event.preventDefault(); $store.commit('setAuth', true); $router.push({ name: 'home' })}">Войти</button> -->
					<FormButton :isLoading="loadBtn" btnText="Зарегестрироваться" :btnFunc="sendData"/> 
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import FormCSRF from '@/components/UI/FormCSRF'
/* import FormInput from '@/components/UI/FormInput' */
import FormButton from '@/components/UI/FormButton'
import ContentLoader from '@/components/UI/ContentLoader'

import AuthService from '@/API/AuthService'
import hashMethods from '@/utils/hashMethods'
export default {
	name: "LoginPage",
	components: {
		FormCSRF,
        /* FormInput, */
        FormButton,
        ContentLoader
	},
	props: {},
	methods: {
		definition_login_entity(fieldValue) {
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
		async sendData(event) {
			event.preventDefault();
			this.loadBtn = true;
			if (!this.definition_login_entity(document.getElementById("login").value)) return;
			
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
				if (response.data.status == 'ok') {

                    this.$router.push({name: 'home'})
                } 
                
                if (response.data.status == 'bed') {
                    //this.errorMsg = response.data.error_type;
                }
			} catch (error) {
				console.log(error);
			} finally {
				this.loadBtn = true;
			}
		},
		async getToken() {
			this.isLoading = true;
			try {
				let response = await AuthService.getLoginToken().then(result => result);
				this.csrf = response.data.data.csrf;
			} catch (error) {
				console.error(error);
			} finally {
				this.isLoading = false;
			}
		}
	},
	beforeMount() {
		document.title = "Logos | Авторизация";
	},
	mounted() {
		this.getToken();
	},
	data() {
		return {
			loadBtn: false,
            isLoading: false,
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