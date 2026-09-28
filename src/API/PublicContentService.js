import $api from '.';
import Config from '@/Config';

const EXPECTED_CONTRACT = 'jsint-public-v1';

const sitePath = () =>
    `/api/public/v1/sites/${encodeURIComponent(Config.siteKey)}`;

const assertContract = (response) => {
    const contract = response.headers?.['x-jsint-public-api'];
    if (contract !== EXPECTED_CONTRACT) {
        throw new Error(
            `Несовместимый публичный API: ожидался ${EXPECTED_CONTRACT}, получено ${contract || 'без версии'}`
        );
    }
    return response;
};

const get = async (path, options = {}) => {
    const response = await $api.get(path, options);
    return assertContract(response);
};

export default class PublicContentService {
    static async getBootstrap(limit = 12) {
        const response = await get(`${sitePath()}/bootstrap`, {
            params: { limit }
        });
        if (response.data?.contract !== EXPECTED_CONTRACT) {
            throw new Error('Backend вернул несовместимый bootstrap-контракт.');
        }
        return response;
    }

    static async getCategories() {
        return get(`${sitePath()}/categories`);
    }

    static async getPublications(params = {}) {
        return get(`${sitePath()}/publications`, { params });
    }

    static async getPublication(slug) {
        return get(
            `${sitePath()}/publications/${encodeURIComponent(slug)}`
        );
    }

    static async getPage(slug) {
        return get(
            `${sitePath()}/pages/${encodeURIComponent(slug)}`
        );
    }
}

export { EXPECTED_CONTRACT };
