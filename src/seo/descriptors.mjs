import { getPublicationProfile } from '@/domain/publication.mjs';

// Данные для поисковых систем формируются без обращения к DOM.
export function homeSeo(url) {
    const title = 'Logos — библиотека знаний и исследований';
    const description = 'Logos — библиотека знаний, тематических материалов, источников и самостоятельных исследований.';
    return {
        title, description, url, ogType: 'website',
        structuredData: {
            '@context': 'https://schema.org', '@type': 'WebSite',
            name: 'Logos', url, description
        }
    };
}

export function catalogSeo(url) {
    const title = 'База знаний | Logos';
    const description = 'Рубрики, статьи, исследования и источники библиотеки Logos.';
    return {
        title, description, url, ogType: 'website',
        structuredData: {
            '@context': 'https://schema.org', '@type': 'CollectionPage',
            name: title, url, description
        }
    };
}

export function categorySeo(category, url) {
    const name = category?.title || 'База знаний';
    const title = `${name} | Logos`;
    const description = category?.description || `Материалы рубрики «${name}» на Logos.`;
    return {
        title, description, url, ogType: 'website',
        structuredData: {
            '@context': 'https://schema.org', '@type': 'CollectionPage',
            name: title, url, description
        }
    };
}

export function articleSeo(article, url, rootUrl) {
    const profile = getPublicationProfile(article);
    const title = `${article.title} | Logos`;
    const description = profile.abstract || article.excerpt || `Материал «${article.title}» на Logos.`;
    return {
        title, description, url, ogType: 'article',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description,
            url,
            datePublished: article.published_at || undefined,
            dateModified: article.updated_at || undefined,
            keywords: Array.isArray(profile.keywords) ? profile.keywords.join(', ') : undefined,
            author: profile.speaker ? { '@type': 'Person', name: profile.speaker } : undefined,
            isPartOf: { '@type': 'WebSite', name: 'Logos', url: rootUrl }
        }
    };
}
