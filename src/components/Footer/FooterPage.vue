<template>
    <footer class="footer">
        <div class="container footer__inner">
            <span>λόγος</span>
            <span>Публичная витрина на backend JSInteractive</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'PageFooter'
};
</script>

<style>
.footer {
    margin-top: auto;
    border-top: 1px solid var(--color-border);
}
.footer__inner {
    min-height: 84px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    color: var(--color-text-muted);
    font-size: 14px;
    text-align: left;
}
.footer__inner span:first-child {
    color: var(--color-text);
    font-size: 24px;
    font-weight: 800;
}
@media (max-width: 620px) {
    .footer__inner {
        padding: 20px 0;
        align-items: flex-start;
        flex-direction: column;
    }
}
</style>
