<template>
    <section class="home-hero">
        <div class="container home-hero__layout">
            <div class="home-hero__content">
                <span class="eyebrow">Православная библиотека</span>
                <h1>Православие <em>и Логос</em></h1>
                <p>
                    Священное Писание в свете Предания Церкви. Статьи о православной вере,
                    святых отцах, богослужении и церковной истории.
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
                    <span class="home-hero__seal-logo">λόγος</span>
                    <span class="home-hero__seal-rule"></span>
                </div>
                <span class="home-hero__corner home-hero__corner--tl">✦</span>
                <span class="home-hero__corner home-hero__corner--br">✦</span>
            </div>
        </div>
    </section>
</template>

<script>
export default { name: 'HomeHero' };
</script>
