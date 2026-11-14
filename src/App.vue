<template>
    <div class="site-shell">
        <SiteHeader />
        <router-view v-slot="{ Component, route }">
            <Transition name="page-fade" mode="out-in">
                <component :is="Component" :key="route.path" />
            </Transition>
        </router-view>
        <SiteFooter />
    </div>
</template>

<script>
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';

export default {
    name: 'App',
    components: { SiteHeader, SiteFooter }
};
</script>
