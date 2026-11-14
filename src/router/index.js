import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';
import CatalogPage from '@/pages/CatalogPage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import PublicationPage from '@/pages/PublicationPage.vue';

const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/catalog', component: CatalogPage, name: 'catalog' },
    { path: '/catalog/:catName', component: CategoryPage, name: 'category', props: true },
    { path: '/catalog/:catName/:slug', component: PublicationPage, name: 'publication', props: true },

    // Старые адреса продолжают работать после изменения структуры каталога.
    { path: '/lecture', redirect: { name: 'catalog' } },
    { path: '/lecture/:catName', redirect: to => ({ name: 'category', params: { catName: to.params.catName } }) },
    { path: '/lecture/:catName/:slug', redirect: to => ({
        name: 'publication', params: { catName: to.params.catName, slug: to.params.slug }
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
