<template>
    <HeaderNavbar />
    <router-view />
    <FooterPage />
</template>

<script>
import HeaderNavbar from '@/components/Navbar/Navbar.vue';
import FooterPage from '@/components/Footer/FooterPage.vue';

export default {
    name: 'App',
    components: {
        HeaderNavbar,
        FooterPage
    }
};
</script>

<style>
:root {
    --color-text: #1e2329;
    --color-text-muted: #66707a;
    --color-accent: #315f5b;
    --color-border: #deddd7;
    --color-surface: #ffffff;
    --color-surface-muted: #eeece6;
    --color-background: #f8f7f4;
    --shadow-soft: 0 18px 50px rgba(30, 35, 41, .06);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    min-width: 320px;
    background: var(--color-background);
    color: var(--color-text);
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    -webkit-font-smoothing: antialiased;
}

button,
input,
textarea,
select {
    font: inherit;
}

img {
    max-width: 100%;
}

#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.container {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
}

main {
    flex: 1;
}

.state-card {
    padding: 28px;
    border: 1px solid var(--color-border);
    border-radius: 18px;
    background: var(--color-surface);
    color: var(--color-text-muted);
    text-align: left;
}

.state-card--error {
    color: #9a3737;
}

.eyebrow {
    color: var(--color-accent);
    font-size: 13px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
}

.back-link {
    color: var(--color-text-muted);
    text-decoration: none;
}

@media (max-width: 620px) {
    .container {
        width: min(100% - 28px, 1180px);
    }
}
</style>
