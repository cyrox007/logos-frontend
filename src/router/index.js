import {createRouter, createWebHistory} from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'

const routes = [
    {path: '/', component: MainPage },
    {path: '/about', component: AboutPage },
    {path: '/login', component: LoginPage },
    {path: '/registration', component: RegistrationPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;