import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import LecturePage from '@/pages/LecturePage.vue';
import LectureListPage from '@/pages/LectureListPage.vue';
import ArticlePage from '@/pages/ArticlePage.vue';

const routes = [
    { path: '/', component: MainPage, name: 'home' },
    { path: '/lecture', component: LecturePage, name: 'lecture' },
    {
        path: '/lecture/:catName',
        component: LectureListPage,
        name: 'category',
        props: true
    },
    {
        path: '/lecture/:catName/:slug',
        component: ArticlePage,
        name: 'article',
        props: true
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
