import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store/index.js'

import MainPage from '@/pages/MainPage.vue'
import LecturePage from '@/pages/LecturePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'

import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
    {path: '/', component: MainPage, name: 'home' },
    {path: '/lecture', component: LecturePage, name: 'lecture' },
    {path: '/login', component: LoginPage, name: 'login', meta: { requestAuth: false } },
    {path: '/registration', component: RegistrationPage, name: 'logup', meta: { requestAuth: false } },

    {path: '/profile', component: ProfilePage, meta: {requestAuth: true}}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(){
        document.getElementById('app').scrollIntoView({ behavior: 'auto' });
    }
});

router.beforeEach((to, from, next) => {
    const requestAuth = to.matched.some(record => record.meta.requestAuth);
    const auth = store.getters.isAuth;
    if (requestAuth && !auth) {
        return next('/login')
    } else if ((to.path == '/login' || to.path == '/registration') && auth) {
        return next('/')
    }
    next()
})

export default router;