/**
 * Создание оглавления из H2/H3: повторяющиеся заголовки получают уникальные ID.
 * Существующие якоря не перезаписываются; данные публикации в CMS не меняются.
 */
export function buildArticleToc(root) {
    if (!root) return [];

    const occupied = new Set(Array.from(root.querySelectorAll('[id]')).map(el => el.id));
    return Array.from(root.querySelectorAll('h2, h3'))
        .map(heading => {
            const title = (heading.textContent || '').trim();
            if (!title) return null;

            let id = heading.id;
            if (!id) {
                const stem =
                    title
                        .toLocaleLowerCase('ru-RU')
                        .replace(/[^a-zа-яё0-9]+/gi, '-')
                        .replace(/^-|-$/g, '') || 'razdel';

                id = stem;
                let suffix = 2;
                while (occupied.has(id)) id = `${stem}-${suffix++}`;

                heading.id = id;
                occupied.add(id);
            }

            return { id, title, level: Number(heading.tagName.slice(1)) };
        })
        .filter(Boolean);
}
