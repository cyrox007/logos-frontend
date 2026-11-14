<template>
    <div class="site-shell">
        <SiteHeader />
        <Transition name="brand-intro">
            <div v-if="showIntro" class="brand-intro" role="status" aria-live="polite">
                <div class="brand-intro__panel">
                    <span class="sr-only">Загружаем библиотеку Logos…</span>
                    <KnowledgeLoader variant="full" />
                    <p class="brand-intro__caption" aria-hidden="true">От вопроса — к пониманию</p>
                </div>
            </div>
        </Transition>
        <router-view v-slot="{ Component, route }">
            <Transition name="page-fade" mode="out-in">
                <component
                    :is="Component"
                    :key="route.path"
                    @loading-change="loading => onPageLoading(route.fullPath, loading)"
                />
            </Transition>
        </router-view>
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import KnowledgeLoader from '@/components/ui/KnowledgeLoader.vue';
import { createBrandLoadingController } from '@/domain/brand-loading.mjs';

export default {
    name: 'App',
    components: { SiteHeader, SiteFooter, KnowledgeLoader },
    data() {
        return { showIntro: false, loadingController: null };
    },
    watch: {
        '$route.fullPath'(path) {
            this.loadingController?.navigate(path);
        }
    },
    created() {
        this.loadingController = createBrandLoadingController({
            schedule: (callback, delay) => window.setTimeout(callback, delay),
            cancel: timer => window.clearTimeout(timer),
            notify: visible => {
                // Не перекрываем сайт анимацией, когда пользователь отключил движение.
                this.showIntro =
                    visible && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
            }
        });
    },
    beforeUnmount() {
        this.loadingController?.dispose();
    },
    methods: {
        onPageLoading(path, loading) {
            if (path !== this.$route.fullPath) return;
            if (loading) this.loadingController.start(path);
            else this.loadingController.finish(path);
        }
    }
};
</script>
