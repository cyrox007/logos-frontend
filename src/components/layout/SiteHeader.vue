<template>
    <header class="site-header">
        <div class="site-header__topline" aria-hidden="true"></div>
        <div class="container site-header__inner">
            <router-link
                class="site-header__brand"
                :to="{ name: 'home' }"
                aria-label="Logos — на главную"
            >
                <span class="site-header__brand-mark">λ</span>
                <span class="site-header__brand-name">λόγος<small>библиотека знаний</small></span>
            </router-link>

            <nav class="site-header__nav" aria-label="Основная навигация">
                <router-link :to="{ name: 'home' }" exact-active-class="is-current"
                    >Главная</router-link
                >
                <router-link :to="{ name: 'catalog' }" active-class="is-current"
                    >Каталог знаний</router-link
                >
                <router-link :to="{ name: 'home', hash: '#principles' }">О проекте</router-link>
            </nav>

            <router-link class="site-header__action" :to="{ name: 'catalog' }">
                Исследовать <span aria-hidden="true">↗</span>
            </router-link>

            <button
                class="site-header__menu"
                type="button"
                :aria-expanded="menuOpen"
                aria-controls="logos-mobile-nav"
                :aria-label="menuOpen ? 'Закрыть меню' : 'Открыть меню'"
                @click="menuOpen = !menuOpen"
            >
                <span>{{ menuOpen ? 'Закрыть' : 'Меню' }}</span>
                <span aria-hidden="true">{{ menuOpen ? '×' : '☰' }}</span>
            </button>
        </div>
        <Transition name="mobile-menu">
            <nav
                v-if="menuOpen"
                id="logos-mobile-nav"
                class="mobile-nav"
                aria-label="Мобильная навигация"
            >
                <div class="container mobile-nav__inner">
                    <router-link :to="{ name: 'home' }" @click="menuOpen = false"
                        >Главная</router-link
                    >
                    <router-link :to="{ name: 'catalog' }" @click="menuOpen = false"
                        >Каталог знаний</router-link
                    >
                    <router-link :to="{ name: 'home', hash: '#principles' }" @click="menuOpen = false"
                        >О проекте</router-link
                    >
                </div>
            </nav>
        </Transition>
    </header>
</template>

<script>
export default {
    name: 'SiteHeader',
    data() {
        return { menuOpen: false };
    },
    watch: {
        '$route.fullPath'() {
            this.menuOpen = false;
        }
    }
};
</script>

<style>
.site-header {
    position: sticky;
    z-index: 30;
    top: 0;
    border-bottom: 1px solid rgba(38, 127, 93, 0.13);
    background: rgba(250, 251, 246, 0.96);
    backdrop-filter: blur(20px);
}
.site-header__topline {
    height: 3px;
    background: linear-gradient(90deg, #2b8964 0%, #5ca47e 60%, #c6a567 100%);
}
.site-header__inner {
    min-height: 85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
}
.site-header__brand {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--color-text);
    text-decoration: none;
    flex-shrink: 0;
}
.site-header__brand-mark {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border: 1px solid var(--color-gold);
    border-radius: 50%;
    color: var(--color-accent-dark);
    font: italic 30px var(--font-display);
}
.site-header__brand-name {
    display: flex;
    flex-direction: column;
    color: var(--color-text);
    font: 500 30px/0.95 var(--font-display);
    letter-spacing: -0.035em;
}
.site-header__brand-name small {
    margin-top: 7px;
    color: var(--color-text-muted);
    font: 700 8px/1.3 var(--font-body);
    letter-spacing: 0.15em;
    text-transform: uppercase;
}
.site-header__nav {
    display: flex;
    align-items: center;
    gap: 28px;
}
.site-header__nav a {
    position: relative;
    padding: 10px 0;
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s ease;
}
.site-header__nav a:hover,
.site-header__nav a.is-current {
    color: var(--color-accent-dark);
}
.site-header__nav a.is-current::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--color-gold);
    transform-origin: center;
    animation: nav-underline-in 0.2s ease both;
}
@keyframes nav-underline-in {
    from {
        transform: scaleX(0);
    }
    to {
        transform: scaleX(1);
    }
}
.site-header__action {
    padding: 11px 16px;
    border: 1px solid #d0dfd1;
    border-radius: 8px;
    color: var(--color-accent-dark);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    white-space: nowrap;
    transition: background 0.2s ease, border-color 0.2s ease;
}
.site-header__action:hover {
    background: var(--color-accent-soft);
}
.site-header__menu {
    display: none;
    align-items: center;
    gap: 10px;
    border: 0;
    background: transparent;
    color: var(--color-accent-dark);
    font-weight: 700;
    cursor: pointer;
    transition: color 0.2s ease;
}
.mobile-nav {
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    border-top: 1px solid var(--color-border);
    background: #fff;
    box-shadow: var(--shadow-soft);
}
.mobile-nav__inner {
    display: grid;
    gap: 3px;
    padding-top: 10px;
    padding-bottom: 14px;
}
.mobile-nav a {
    padding: 12px 6px;
    color: var(--color-text);
    text-decoration: none;
    font-weight: 600;
}
.mobile-nav a.router-link-active {
    color: var(--color-accent);
}
.mobile-nav a {
    transition: color 0.2s ease, background 0.2s ease;
}
.mobile-nav a:hover {
    background: var(--color-accent-soft);
}
@media (min-width: 651px) {
    .mobile-nav {
        display: none;
    }
}
@media (max-width: 900px) {
    .site-header__nav {
        gap: 15px;
    }
    .site-header__action {
        display: none;
    }
}
@media (max-width: 650px) {
    .site-header__inner {
        min-height: 72px;
    }
    .site-header__nav {
        display: none;
    }
    .site-header__menu {
        display: flex;
    }
    .site-header__brand-name {
        font-size: 27px;
    }
}
</style>
