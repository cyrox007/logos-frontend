<template>
<section id="principles" class="home-principles" aria-labelledby="principles-title">
            <div class="container home-principles__layout">
                <div class="home-principles__intro">
                    <span class="eyebrow">Подход к знанию</span>
                    <h2 id="principles-title" class="section-title">Важен не только ответ, но и путь к нему.</h2>
                    <p>Logos объединяет справочные знания и авторский исследовательский взгляд. Материал может стать отправной точкой для дальнейшего изучения — благодаря контексту, ссылкам и источникам.</p>
                    <router-link class="text-link" :to="{ name: 'catalog' }">Исследовать материалы <span aria-hidden="true">↗</span></router-link>
                </div>
                <div class="home-principles__list">
                    <div v-for="principle in principles" :key="principle.number" class="home-principles__item">
                        <span class="home-principles__number">{{ principle.number }}</span>
                        <div>
                            <h3>{{ principle.title }}</h3>
                            <p>{{ principle.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>

<script>
export default {
    name: 'HomePrinciples',
    data() {
        return {
            principles: [
                { number: '01', title: 'Системность', description: 'Каждый материал занимает своё место среди тем и взаимосвязей.' },
                { number: '02', title: 'Работа с источниками', description: 'Библиография и первичные материалы помогают проследить основания выводов.' },
                { number: '03', title: 'Самостоятельное исследование', description: 'Наблюдения, сопоставления и гипотезы открыты для внимательного осмысления.' }
            ]
        };
    }
};
</script>
