import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/home.css';
import '@/styles/catalog.css';
import '@/styles/category.css';
import '@/styles/article.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';

createApp(App).use(router).mount('#app');
