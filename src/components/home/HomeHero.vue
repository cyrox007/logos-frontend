<template>
    <section class="home-hero">
        <div class="container home-hero__layout">
            <div class="home-hero__content">
                <span class="eyebrow">Библиотека знаний и исследований</span>
                <h1>Знание начинается <em>с вопроса.</em></h1>
                <p>
                    Logos — пространство для изучения истории, культуры, философии и других областей
                    знания. Здесь встречаются справочные материалы, источники и самостоятельные
                    исследования.
                </p>
                <div class="home-hero__actions">
                    <router-link class="button button--primary" :to="{ name: 'catalog' }"
                        >Открыть каталог <span aria-hidden="true">↗</span></router-link
                    >
                    <a class="button button--outline" href="#principles">О проекте</a>
                </div>
            </div>
            <div class="home-hero__art" aria-hidden="true">
                <div class="home-hero__seal">
                    <span class="home-hero__seal-kicker">Знания · Источники · Исследования</span>
                    <span class="home-hero__seal-logo">λόγος</span>
                    <span class="home-hero__seal-rule"></span>
                    <span class="home-hero__seal-caption">От вопроса — к пониманию</span>
                </div>
                <span class="home-hero__corner home-hero__corner--tl">✦</span>
                <span class="home-hero__corner home-hero__corner--br">✦</span>
            </div>
        </div>
        <div class="container home-hero__footnote">
            <span>Открывать. Изучать. Осмыслять.</span>
            <span class="home-hero__footnote-line"></span>
            <span>LOGOS / БИБЛИОТЕКА ЗНАНИЙ</span>
        </div>
    </section>
</template>

<script>
export default { name: 'HomeHero' };
</script>
