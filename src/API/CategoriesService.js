import PublicContentService from './PublicContentService';

export default class CategoriesService {
    static async getCategories() {
        return PublicContentService.getCategories();
    }
}
