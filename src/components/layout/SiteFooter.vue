<template>
    <footer class="footer">
        <div class="container footer__inner">
            <div class="footer__identity">
                <router-link :to="{ name: 'home' }" class="footer__logo">λόγος</router-link>
                <p>Православная библиотека о Писании и жизни Церкви.</p>
            </div>
            <nav class="footer__links" aria-label="Навигация внизу страницы">
                <router-link :to="{ name: 'home' }">Главная</router-link>
                <router-link :to="{ name: 'catalog' }">Каталог знаний</router-link>
                <router-link :to="{ name: 'home', hash: '#principles' }">О проекте</router-link>
            </nav>
        </div>
        <div class="container footer__bottom">
            <span>Православие и Логос</span>
            <span>Содержание и представление — Logos</span>
        </div>
    </footer>
</template>

<script>
export default { name: 'SiteFooter' };
</script>

<style>
.footer {
    margin-top: auto;
    border-top: 1px solid var(--color-border);
    background: #f2f6ef;
}
.footer__inner {
    padding: 58px 0 44px;
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 40px;
}
.footer__identity {
    max-width: 400px;
}
.footer__logo {
    font: 500 42px/1 var(--font-display);
    color: var(--color-accent-dark);
    text-decoration: none;
}
.footer__identity p {
    margin-top: 15px;
    color: var(--color-text-muted);
    font-size: 14px;
}
.footer__links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px 30px;
    padding-top: 10px;
}
.footer__links a {
    color: var(--color-text);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
}
.footer__links a:hover {
    color: var(--color-accent);
}
.footer__bottom {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 22px 0 28px;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-muted);
    font-size: 12px;
}
@media (max-width: 700px) {
    .footer__inner,
    .footer__bottom {
        flex-direction: column;
    }
    .footer__inner {
        padding: 38px 0 28px;
        gap: 26px;
    }
}
</style>
