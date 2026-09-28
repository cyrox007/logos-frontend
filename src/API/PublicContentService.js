import $api from '.';
import Config from '@/Config';

const sitePath = () =>
    `/api/public/v1/sites/${encodeURIComponent(Config.siteKey)}`;

export default class PublicContentService {
    static async getBootstrap(limit = 12) {
        return $api.get(`${sitePath()}/bootstrap`, {
            params: { limit }
        });
    }

    static async getCategories() {
        return $api.get(`${sitePath()}/categories`);
    }

    static async getPublications(params = {}) {
        return $api.get(`${sitePath()}/publications`, { params });
    }

    static async getPublication(slug) {
        return $api.get(
            `${sitePath()}/publications/${encodeURIComponent(slug)}`
        );
    }

    static async getPage(slug) {
        return $api.get(
            `${sitePath()}/pages/${encodeURIComponent(slug)}`
        );
    }
}
