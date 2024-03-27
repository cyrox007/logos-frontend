<template>
    <section class="registration">
        <div class="container">
            <div class="registration__wrapper">
                <h1>Форма регистрации</h1>
                <p>* - поля отмеченные звездочкой обязательны для заполнения</p>
                <form action="" method="post" class="registration__form" id="registration-form">
                    <!--  -->
                    <input type="hidden" id="iphash" name="ip-hash" :value="csrf.iphash">
                    <input type="hidden" id="request-tokent" name="request-tokent" :value="csrf.requestToken">
                    <input type="hidden" id="sig" name="sig" :value="csrf.sig"> 
                    <!--  -->
                    <div class="registration__form_group">
                        <div class="registration__form_row">
                            <p class="registration__form_label">Фамилия <span>*</span></p>
                            <input type="text" name="last-name" id="last-name" class="registration__form_input" @change="dataRequaired($event), dataCyrillic($event)" required>
                            <span id="er"></span>
                        </div>
                        <div class="registration__form_row">
                            <p class="registration__form_label">Имя <span>*</span></p>
                            <input type="text" name="first-name" id="first-name" class="registration__form_input" @change="dataRequaired($event), dataCyrillic($event)" required>
                            <span id="er"></span>
                        </div>
                        <div class="registration__form_row">
                            <p class="registration__form_label">Отчество <span>*</span></p>
                            <input type="text" name="patronymic" id="patronymic" class="registration__form_input" @change="dataRequaired($event), dataCyrillic($event)" required>
                            <span id="er"></span>
                        </div>
                    </div>
                    <div class="registration__form_group">
                        <div class="registration__form_row">
                            <p class="registration__form_label">E-mail <span>*</span></p>
                            <input type="email" name="email" id="email" class="registration__form_input" @change="dataRequaired($event), dataEmail($event)" required>
                            <span id="er"></span>
                        </div>
                        <div class="registration__form_row">
                            <p class="registration__form_label">Телефон <span>*</span></p>
                            <input type="tel" name="phone" id="phone" class="registration__form_input" @change="dataRequaired($event), dataPhone($event)" required>
                            <span id="er"></span>
                        </div>
                    </div>
                    <div class="registration__form_group">
                        <div class="registration__form_row">
                            <p class="registration__form_label">Пароль <span>*</span></p>
                            <input type="password" name="password" id="password" class="registration__form_input" @change="dataRequaired($event), dataPassword($event)" required>
                            <span id="er"></span>
                        </div>
                        <div class="registration__form_row">
                            <p class="registration__form_label">Повторите пароль <span>*</span></p>
                            <input type="password" name="r_password" id="r_password" class="registration__form_input" @change="dataRequaired($event), dataPassRepeat($event)" required>
                            <span id="er"></span>
                        </div>
                    </div>
                    <div class="registration__form_row">
                        <label for="is-monc">Монашеский постриг</label>
                        <input type="checkbox" name="is-monc" id="is-monc" @change="moncNameField($event), holyOrdersField($event)">
                    </div>
                    <div class="registration__form_row" id="monc-name-field" style="display: none;">
                        <p class="registration__form_label">Имя в постриге</p>
                        <input type="text" name="monc-name" id="monc-name" class="registration__form_input" @change="moncField ? (dataRequaired($event), dataCyrillic($event)) : null">
                    </div>
                    <div class="registration__form_row">
                        <label for="holy-orders">Сан</label>
                        <input type="checkbox" name="holy-orders" id="holy-orders" @change="holyOrdersField">
                    </div>
                    <div class="registration__form_row" id="holy-orders-field" style="display: none;">
                        <p class="registration__form_label">Укажите ваш сан</p>
                        <select name="holy-orders-list" id="holy-orders-list" class="registration__form_select">
                            
                        </select>
                    </div>
                    <div class="registration__form_group">
                        <div class="registration__form_row">
                            <p class="registration__form_label">Страна</p>
                            <input type="text" name="country" id="country" class="registration__form_input">
                        </div>
                        <div class="registration__form_row">
                            <p class="registration__form_label">Город</p>
                            <input type="text" name="city" id="city" class="registration__form_input">
                        </div>
                    </div>
                    <div class="registration__form_errors">
                        <ul>

                        </ul>
                    </div>
                    <button id="btn-submit" type="submit" @click="sendData">Зарегестрироваться</button>                
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import AuthService from '@/API/AuthService'
import hashMethods from '@/utils/hashMethods'
export default {
    name: 'RegistrationPage',
    components: {},
    props: {},
    computed: {
        
    },
    methods: {
        getHolyOrder(monc) {
            let holyOrderList = {
                initial: {
                    psalmreader: 'чтец',
                    subdeacon: "иподьякон"
                },
                white: {
                    deacon: 'дьякон',
                    protodeacon: "протодьякон",
                    priest: 'иерей',
                    archpriest: 'протоиерей',
                },
                black: {
                    deacon: 'иеродьякон',
                    protodeacon: "архидьякон",
                    priest: 'иеромонах',
                    archpriest: 'игумен',
                    archimandrite: 'архимандрит',
                    bishop: 'епископ',
                    archbishop: 'архиепископ',
                    metropolitan: 'митрополит',
                }
            }
            if (monc) {
                return { ...holyOrderList.initial, ...holyOrderList.black }
            } else {
                return { ...holyOrderList.initial, ...holyOrderList.white }
            }
        },
        clearValidateStatus(event){
            if (event.target.classList.contains('error')) {
                event.target.classList.remove('error');
            } else if (event.target.classList.contains('currect')) {
                event.target.classList.remove('currect');
            }
        },
        dataRequaired(event){
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";
            
            if (event.target.value === '' || event.target.value.length < 2) {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Поле не заполнено";
            } else {
                event.target.classList.add("currect");
                event.target.parentElement.querySelector("#er").textContent = "";
            }
        },
        dataCyrillic(event){
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";

            const val = event.target.value;
            const cyrillicPattern = /^[\u0400-\u04FF]+$/;
            
            if (cyrillicPattern.test(val) === true) {
                event.target.classList.add('currect');
                event.target.parentElement.querySelector("#er").textContent = "";
            } else {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Английские символы в этом поле не допустимы";
            }
        },
        dataEmail(event) {
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";

            const validateEmailRegex = /^\S+@\S+\.\S+$/;
            const email = event.target.value;
            if (validateEmailRegex.test(email)) {
                event.target.classList.add('currect');
                event.target.parentElement.querySelector("#er").textContent = "";
            } else {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Некорректный адрес email";
            }
        },
        dataPhone(event) {
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";

            const validatePhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
            const phone = event.target.value;
            if (validatePhone.test(phone)) {
                event.target.classList.add('currect');
                event.target.parentElement.querySelector("#er").textContent = "";
            } else {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Некорректный номер телефона";
            }
        },
        dataPassword(event) {
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";

            const password = event.target.value;
            const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
            if (passwordRegex.test(password)) {
                event.target.classList.add('currect');
                event.target.parentElement.querySelector("#er").textContent = "";
            } else {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Пароль должен содержать латинские буквы, как минимум одну заглавную, цифры, и состоять из не менее 8 символов";
            }
        },
        dataPassRepeat(event) {
            this.clearValidateStatus(event);
            event.target.parentElement.querySelector("#er").textContent = "";
            
            const password = document.getElementById('password').value;
            const r_pass = event.target.value;
            if (password === r_pass) {
                event.target.classList.add('currect');
                event.target.parentElement.querySelector("#er").textContent = "";
            } else {
                event.target.classList.add("error");
                event.target.parentElement.querySelector("#er").textContent = "Пароли не совпадают";
            }
        },
        moncNameField(event) {
            if (event.target.checked) {
                document.getElementById('monc-name').parentElement.style.display = 'block';
                document.getElementById('monc-name').required = true;
                this.moncField = true;
            } else {
                document.getElementById('monc-name').parentElement.style.display = 'none';
                document.getElementById('monc-name').required = false;
                this.clearValidateStatus(event)
                this.moncField = false;
            }
        },
        
        holyOrdersField() {
            const holyOrdersList = document.getElementById('holy-orders-list');
            let holyOrders = this.getHolyOrder(document.getElementById('is-monc').checked);
            if (document.getElementById('holy-orders').checked) {
                holyOrdersList.parentElement.style.display = 'block';
                holyOrdersList.innerHTML = '';
                for (const key in holyOrders) {
                    const option = document.createElement('option');
                    option.setAttribute('value', key);
                    option.textContent = holyOrders[key];
                    holyOrdersList.appendChild(option);
                }
            } else {
                holyOrdersList.parentElement.style.display = 'none';
                holyOrdersList.innerHTML = '';
            }
        },
        finalCheckedFields(){
            let status = true;

            const lastname = document.getElementById("last-name"),
                firstname = document.getElementById("first-name"),
                patronymic = document.getElementById("patronymic"),
                email = document.getElementById("email"),
                phone = document.getElementById("phone"),
                password = document.getElementById("password"),
                rpassword = document.getElementById("r_password");

            if (lastname.value === '') {
                lastname.classList.add('error');
                lastname.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (firstname.value === '') {
                firstname.classList.add('error');
                firstname.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (patronymic.value === '') {
                patronymic.classList.add('error');
                patronymic.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (email.value === '') {
                email.classList.add('error');
                email.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (phone.value === '') {
                phone.classList.add('error');
                phone.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (password.value === '') {
                password.classList.add('error');
                password.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }
            if (rpassword.value === '') {
                rpassword.classList.add('error');
                rpassword.parentElement.querySelector('#er').textContent = "Поле не заполнено";
                status = false;
            }

            return status;
        },
        async sendData(event){
            event.preventDefault();
            const form = document.getElementById("registration-form");
            let errors = form.getElementsByClassName("error");
            if (errors.length > 0) { return; }

            if (!this.finalCheckedFields()) { return; }

            let data = {
                requestToken: document.getElementById("request-tokent").value,
                ip_hash: document.getElementById("iphash").value,
                sig: document.getElementById("sig").value,

                lastname: document.getElementById("last-name").value,
                firstname: document.getElementById("first-name").value,
                patronymic: document.getElementById("patronymic").value,
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                password: hashMethods.passwordToHash(document.getElementById("password").value),

                isMonc: document.getElementById("is-monc").checked,
                moncName: document.getElementById('is-monc').checked ? document.getElementById('monc-name').value : null,


                isHolyOrder: document.getElementById("holy-orders").checked,
                holyOrder: document.getElementById('holy-orders').checked ? document.getElementById('holy-orders-list').options[document.getElementById('holy-orders-list').selectedIndex].text : null,
                
                country: document.getElementById("country").value,
                city: document.getElementById("city").value
            };
            let response = await AuthService.registration(data);
            console.log(response);
        },
        async getToken () {
            try {
                let response = await AuthService.getRegisterToken().then(result=>result);
                this.csrf = response.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    beforeMount() {
		document.title = "Logos | Регистрация";
	},
    data(){
        this.getToken();
        return {
            moncField: false,
            csrf: {}
        }
    }
}
</script>

<style>
.registration {
  width: 100%;
  margin: 40px 0;
  padding: 40px 0;
  background-color: var(--color-white);
}
.registration__wrapper {
  width: 100%;
}
.registration__wrapper h1 {
  text-align: center;
}
.registration__form {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
.registration__form_group {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
@media screen and (max-width: 500px) {
  .registration__form_group {
    flex-direction: column;
  }
}
.registration__form_row {
    text-align: left;
  flex: 1 1 100%;
  margin-bottom: 15px;
}
.registration__form_label span {
  color: #dc3545;
}
.registration__form_input {
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
.registration__form_input:focus {
  border-color: var(--color-blue);
}
.registration__form_input.error {
  border-color: #dc3545;
}
.registration__form_input.currect {
  border-color: #28a745;
}
.registration__form_errors {
  height: 0px;
  margin-top: 20px;
  background-color: #dc3545;
  color: #fff;
  border-radius: 8px;
  transition: height 0.2s ease-in-out;
}
.registration__form_errors ul {
  margin: 20px;
}
.registration__form_errors.visible {
  height: auto;
}
.registration__form button {
  margin-top: 15px;
  padding: 12px;
  background-color: #007bff;
  border: 1px solid transparent;
  border-color: #007bff;
  border-radius: 8px;
  color: var(--color-white);
  transition: background 0.15s ease-in-out;
}
.registration__form button:hover {
  background: #0069d9;
  border-color: #0069d9;
}
.registration__form button:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}
</style>