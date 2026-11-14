import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import LecturePage from '@/pages/LecturePage.vue';
import LectureListPage from '@/pages/LectureListPage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';

const routes = [
    { path: '/', component: MainPage, name: 'home' },
    { path: '/catalog', component: LecturePage, name: 'lecture' },
    { path: '/catalog/:catName', component: LectureListPage, name: 'category', props: true },
    { path: '/catalog/:catName/:slug', component: ArticlePage, name: 'article', props: true },

    // Старые адреса продолжают работать после изменения структуры каталога.
    { path: '/lecture', redirect: { name: 'lecture' } },
    { path: '/lecture/:catName', redirect: to => ({ name: 'category', params: { catName: to.params.catName } }) },
    { path: '/lecture/:catName/:slug', redirect: to => ({
        name: 'article', params: { catName: to.params.catName, slug: to.params.slug }
    }) },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { el: to.hash, top: 110, behavior: 'smooth' };
        return { top: 0 };
    }
});

export default router;
