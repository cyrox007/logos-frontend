// Общие правила представления материалов библиотеки.
export const SUPPORTED_PROFILE_SCHEMAS = ['logos.article', 'logos.lecture'];

export function getPublicationProfile(article) {
    const envelope = article?.data;
    if (
        !envelope ||
        envelope.version !== 1 ||
        !SUPPORTED_PROFILE_SCHEMAS.includes(envelope.schema) ||
        typeof envelope.data !== 'object' ||
        envelope.data === null ||
        Array.isArray(envelope.data)
    )
        return {};
    return envelope.data;
}

export function filterByFields(items, query, fields) {
    const term = String(query || '')
        .trim()
        .toLocaleLowerCase('ru-RU');
    if (!term) return items;
    return items.filter(item =>
        fields.some(field =>
            String(item?.[field] || '')
                .toLocaleLowerCase('ru-RU')
                .includes(term)
        )
    );
}

export function russianPlural(count, forms) {
    const n = Math.abs(Number(count));
    if (n % 10 === 1 && n % 100 !== 11) return forms[0];
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)) return forms[1];
    return forms[2];
}

export function formatPublicationDate(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

export function estimateReadingMinutes(html) {
    const text = String(html || '')
        .replace(/<[^>]*>/g, ' ')
        .trim();
    const count = text.split(/\s+/).filter(Boolean).length;
    return count ? Math.max(1, Math.ceil(count / 180)) : 0;
}
