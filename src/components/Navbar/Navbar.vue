<template>
    <header class="site-header">
        <div class="container site-header__inner">
            <router-link class="site-header__brand" :to="{ name: 'home' }">λόγος</router-link>

            <nav class="site-header__nav" aria-label="Основная навигация">
                <router-link :to="{ name: 'home' }">Главная</router-link>
                <router-link :to="{ name: 'lecture' }">База знаний</router-link>
            </nav>

            <button
                class="site-header__menu"
                type="button"
                :aria-expanded="menuOpen ? 'true' : 'false'"
                aria-label="Открыть меню"
                @click="menuOpen = !menuOpen"
            >
                {{ menuOpen ? 'Закрыть' : 'Меню' }}
            </button>
        </div>

        <nav v-if="menuOpen" class="mobile-nav" aria-label="Мобильная навигация">
            <div class="container mobile-nav__inner">
                <router-link :to="{ name: 'home' }" @click="menuOpen = false">Главная</router-link>
                <router-link :to="{ name: 'lecture' }" @click="menuOpen = false">База знаний</router-link>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderNavbar',
    data() {
        return {
            menuOpen: false
        };
    }
};
</script>

<style>
.site-header {
    position: sticky;
    z-index: 20;
    top: 0;
    border-bottom: 1px solid var(--color-border);
    background: rgba(248, 247, 244, .94);
    backdrop-filter: blur(18px);
}
.site-header__inner {
    min-height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}
.site-header__brand {
    color: var(--color-text);
    font-size: 30px;
    font-weight: 800;
    text-decoration: none;
}
.site-header__nav {
    display: flex;
    gap: 6px;
}
.site-header__nav a,
.mobile-nav a {
    padding: 10px 13px;
    border-radius: 999px;
    color: var(--color-text-muted);
    text-decoration: none;
    font-weight: 700;
}
.site-header__nav a.router-link-active {
    background: var(--color-surface);
    color: var(--color-text);
}
.site-header__menu {
    display: none;
    border: 0;
    background: transparent;
    color: var(--color-text);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}
.mobile-nav {
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
}
.mobile-nav__inner {
    padding-top: 10px;
    padding-bottom: 14px;
    display: grid;
    gap: 4px;
}
@media (max-width: 620px) {
    .site-header__nav {
        display: none;
    }
    .site-header__menu {
        display: block;
    }
}
</style>
