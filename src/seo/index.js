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

function setStructuredData(key, payload) {
    let node = document.head.querySelector(`script[data-logos-seo="${key}"]`);
    if (!node) {
        node = document.createElement('script');
        node.type = 'application/ld+json';
        node.dataset.logosSeo = key;
        document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(payload);
}

function profileData(article) {
    const envelope = article?.data;
    if (
        !envelope ||
        envelope.version !== 1 ||
        !['logos.article', 'logos.lecture'].includes(envelope.schema) ||
        typeof envelope.data !== 'object' ||
        envelope.data === null
    ) {
        return {};
    }
    return envelope.data;
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
    setStructuredData('page', {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: BRAND,
        url: canonicalUrl('/'),
        description
    });
}

export function applyCatalogSeo() {
    const title = 'База знаний | Logos';
    const description = 'Тематические рубрики и публикации Logos.';
    const url = canonicalUrl('/lecture');

    document.title = title;
    setMeta('description', description);
    setCanonical(url);
    setProperty('og:type', 'website');
    setProperty('og:site_name', BRAND);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', url);
    setStructuredData('page', {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        url,
        description
    });
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
    const url = canonicalUrl();
    setProperty('og:url', url);
    setStructuredData('page', {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        url,
        description
    });
}

export function applyArticleSeo(article) {
    const title = `${article.title} | Logos`;
    const profile = profileData(article);
    const description = profile.abstract || article.excerpt || `Материал «${article.title}» на Logos.`;
    const url = canonicalUrl();

    document.title = title;
    setMeta('description', description);
    setCanonical(url);
    setProperty('og:type', 'article');
    setProperty('og:site_name', BRAND);
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:url', url);

    setStructuredData('page', {
        '@context': 'https://schema.org',
        '@type': article.source_type === 'lecture' ? 'Article' : 'Article',
        headline: article.title,
        description,
        url,
        datePublished: article.published_at || undefined,
        dateModified: article.updated_at || undefined,
        keywords: Array.isArray(profile.keywords) ? profile.keywords.join(', ') : undefined,
        author: profile.speaker
            ? {'@type': 'Person', name: profile.speaker}
            : undefined,
        isPartOf: {
            '@type': 'WebSite',
            name: BRAND,
            url: canonicalUrl('/')
        }
    });
}
