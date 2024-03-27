<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper">
				<div class="header__social">

					<div class="header__social_b">
						<p>Мы в соц.сетях:</p>
					</div>

					<div class="header__social_item">
						<a href="https://vk.com/public99835977" target="_blank" class="header__social_link">
							<i class="fa fa-vk" aria-hidden="true"></i>
						</a>
					</div>

				</div>
				<div class="header__navigate">

					<div @click="$router.push('/')" class="header__navigate_item">
						<a class="header__navigate_link">Главная</a>
					</div>
					<div @click="$router.push('/about')" class="header__navigate_item">
						<a class="header__navigate_link">База знаний</a>
					</div>

				</div>
				<div v-if="$store.getters.getAuth" class="header__profile-nav">
					<div @click="$router.push(`/user/${userid}`)" class="header__auth_item">
						{{ username }}
					</div>
					<div @click="$router.push('/logout')" class="header__auth_item">
						Выйти
					</div>
				</div>
				<div v-else class="header__auth">

					<div @click="$router.push('/login')" class="header__auth_item">
						Войти
					</div>
					<div @click="$router.push('/registration')" class="header__auth_item">
						Зарегестрироваться
					</div>

				</div>
				<div id="mobile-btn" class="header__mobile-btn" @click="mobileNav">
					<i class="fa fa-bars" aria-hidden="true"></i>
				</div>
				<nav id="mobile-nav" class="header__mobile-nav">
					<div data-to="/" @click="hideMNav" class="header__navigate_item">
						Главная
					</div>
					<div data-to="/about" @click="hideMNav" class="header__navigate_item">
						О сайте
					</div>
					<div data-to="/about" @click="hideMNav" class="header__navigate_item">
						Блог
					</div>
					<hr>
					<div data-to="/login" @click="hideMNav" class="header__auth_item">
                        Войти
                    </div>
                    <div class="header__auth_item">
                        Зарегестрироваться
                    </div>
				</nav>
			</div>
		</div>
	</header>
	<section class="subheader">
		<div class="subheader__logo">
			<a @click="$router.push('/')">λόγος</a>
		</div>
	</section>
</template>
<script>
export default {
	name: "HeaderNavbar",
	methods: {
		mobileNav(event) {
			event.preventDefault();
			const mobileNav = document.getElementById("mobile-nav");
			mobileNav.classList.toggle('active');
		},
		hideMNav(event) {
			event.preventDefault();
			event.target.parentElement.classList.toggle('active');
			this.$router.push(event.target.dataset.to)
		}
	},
	data() {
		return {
			auth: Boolean(localStorage.getItem('auth')),
			/* username: String(localStorage.getItem("username")),
			userid: String(localStorage.getItem('userid')) */
		}
	},

}
</script>

<style>
.header {
	background: var(--color-blue);
	font-size: 15px;
}

.header__wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.header__social {
	display: flex;
	justify-content: space-between;
}

@media screen and (max-width: 600px) {
	.header__social {
		display: none;
	}
}

.header__social_b {
	padding: 15px;
}

.header__social_b p {
	color: var(--color-white);
}

@media screen and (max-width: 768px) {
	.header__social_b {
		display: none;
	}
}

.header__social_item {
	cursor: pointer;
	padding: 15px;
	transition: background 0.15s ease;
}

.header__social_item:hover {
	background: var(--сolor-link-hover);
}

.header__social_link {
	cursor: pointer;
	text-decoration: none;
	color: var(--color-white);
}

.header__navigate {
	display: flex;
	justify-content: space-between;
}

@media screen and (max-width: 500px) {
	.header__navigate {
		display: none;
	}
}

.header__navigate_item {
	cursor: pointer;
	color: #fff;
	padding: 15px;
	transition: background 0.15s ease;
}

.header__navigate_item:hover {
	background: var(--сolor-link-hover);
}

.header__navigate_link {
	cursor: pointer;
	text-decoration: none;
	color: var(--color-white);
}

.header__auth {
	display: flex;
	justify-content: space-between;
}

@media screen and (max-width: 500px) {
	.header__auth {
		display: none;
	}
}

.header__auth_item {
	color: #fff;
	cursor: pointer;
	padding: 15px;
	transition: background 0.15s ease;
}

.header__auth_item:hover {
	background: var(--сolor-link-hover);
}

.header__auth_link {
	text-decoration: none;
	color: var(--color-white);
}

.header__mobile-btn {
	display: none;
	padding: 15px;
	cursor: pointer;
}

.header__mobile-btn i {
	color: var(--color-white);
	font-size: 20px;
}

@media screen and (max-width: 500px) {
	.header__mobile-btn {
		display: flex;
	}
}

.header__mobile-nav {
	position: absolute;
	z-index: 999;
	top: 50px;
	bottom: 0;
	left: 0;
	right: 0;
	display: none;
	flex-direction: column;
	transform: translateX(-100%);
	transition: transform 0.2s ease-in-out;
	background: var(--color-blue);
}

.header__mobile-nav.active {
	transform: translateX(0%);
}

@media screen and (max-width: 500px) {
	.header__mobile-nav {
		display: flex;
	}
}

.header__mobile-nav hr {
	color: var(--color-white);
}

.subheader {
	background: var(--color-white);
	width: 100%;
	border-bottom: 1px solid var(--color-blue);
	box-shadow: 0 4px 15px -12px var(--color-black);
}

.subheader__logo {
	padding: 40px 0;
	display: flex;
	justify-content: center;
}

.subheader__logo a {
	cursor: pointer;
	text-align: center;
	text-decoration: none;
	font-size: 38px;
	text-transform: uppercase;
	font-weight: 500;
	color: var(--color-black);
}
</style>