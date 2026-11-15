<template>
    <section id="principles" class="home-principles" aria-labelledby="principles-title">
        <div class="container home-principles__layout">
            <div class="home-principles__intro">
                <span class="eyebrow">О проекте</span>
                <h2 id="principles-title" class="section-title">
                    Писание и жизнь Церкви
                </h2>
                <p>
                    В библиотеке собраны материалы для чтения Священного Писания и знакомства с
                    православным вероучением. В статьях можно найти ссылки на святоотеческие
                    толкования и другие церковные источники.
                </p>
                <router-link class="text-link" :to="{ name: 'catalog' }"
                    >Открыть каталог <span aria-hidden="true">↗</span></router-link
                >
            </div>
            <div class="home-principles__list">
                <div
                    v-for="principle in principles"
                    :key="principle.number"
                    class="home-principles__item"
                >
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
                {
                    number: '01',
                    title: 'Священное Писание',
                    description: 'Книги Ветхого и Нового Заветов и их толкование.'
                },
                {
                    number: '02',
                    title: 'Святые отцы',
                    description:
                        'Святоотеческие сочинения о вере и христианской жизни.'
                },
                {
                    number: '03',
                    title: 'Жизнь Церкви',
                    description:
                        'Богослужение, церковные праздники и история Церкви.'
                }
            ]
        };
    }
};
</script>
