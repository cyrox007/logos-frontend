import { homeSeo, catalogSeo, categorySeo, articleSeo } from '@/seo/descriptors.mjs';

function ensureMeta(selector, attributes) {
    let node = document.head.querySelector(selector);
    if (!node) {
        node = document.createElement('meta');
        Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
        document.head.appendChild(node);
    }
    return node;
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

function setStructuredData(data) {
    let node = document.head.querySelector('script[data-logos-seo="page"]');
    if (!node) {
        node = document.createElement('script');
        node.type = 'application/ld+json';
        node.dataset.logosSeo = 'page';
        document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(data);
}

function canonicalUrl(path = window.location.pathname) {
    return new URL(path, window.location.origin).toString();
}

// Единственная точка обновления title, canonical, OpenGraph и JSON-LD.
function applySeo(metadata) {
    document.title = metadata.title;
    ensureMeta('meta[name="description"]', { name: 'description' })
        .setAttribute('content', metadata.description);
    setCanonical(metadata.url);

    const properties = {
        'og:type': metadata.ogType,
        'og:site_name': 'Logos',
        'og:title': metadata.title,
        'og:description': metadata.description,
        'og:url': metadata.url
    };
    Object.entries(properties).forEach(([property, value]) => {
        ensureMeta(`meta[property="${property}"]`, { property })
            .setAttribute('content', value);
    });

    setStructuredData(metadata.structuredData);
}

export function applyHomeSeo() {
    applySeo(homeSeo(canonicalUrl('/')));
}

export function applyCatalogSeo() {
    applySeo(catalogSeo(canonicalUrl('/catalog')));
}

export function applyCategorySeo(category) {
    applySeo(categorySeo(category, canonicalUrl()));
}

export function applyArticleSeo(article) {
    applySeo(articleSeo(article, canonicalUrl(), canonicalUrl('/')));
}
