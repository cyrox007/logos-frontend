const BRAND = 'Logos';

function ensureMeta(selector, attributes) {
    let node = document.head.querySelector(selector);
    if (!node) {
        node = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
        document.head.appendChild(node);
    }
    return node;
}

function setMeta(name, content) {
    const node = ensureMeta(`meta[name="${name}"]`, { name });
    node.setAttribute('content', content || '');
}

function setProperty(property, content) {
    const node = ensureMeta(`meta[property="${property}"]`, { property });
    node.setAttribute('content', content || '');
}

function setCanonical(url) {
    let node = document.head.querySelector('link[rel="canonical"]');
    if (!node) {
        node = document.createElement('link');
        node.setAttribute('rel', 'canonical');
        document.head.appendChild(node);
    }
    node.setAttribute('href', url);
}

function canonicalUrl(pathname = window.location.pathname) {
    return new URL(pathname, window.location.origin).toString();
}

export function applyHomeSeo() {
    const title = 'Logos — база знаний и публикации';
    const description = 'Logos — самостоятельная публичная витрина материалов и тематических публикаций.';

    document.title = title;
    setMeta('description', description);
    setCanonical(canonicalUrl('/'));
    setProperty('og:type', 'website');
    setProperty('og:site_name', BRAND);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', canonicalUrl('/'));
}

export function applyCategorySeo(category) {
    const name = category?.title || 'База знаний';
    const description = category?.description || `Материалы рубрики «${name}» на Logos.`;
    const title = `${name} | Logos`;

    document.title = title;
    setMeta('description', description);
    setCanonical(canonicalUrl());
    setProperty('og:type', 'website');
    setProperty('og:site_name', BRAND);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', canonicalUrl());
}

export function applyArticleSeo(article) {
    const title = `${article.title} | Logos`;
    const description = article.excerpt || `Материал «${article.title}» на Logos.`;
    const url = canonicalUrl();

    document.title = title;
    setMeta('description', description);
    setCanonical(url);
    setProperty('og:type', 'article');
    setProperty('og:site_name', BRAND);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', url);
}
