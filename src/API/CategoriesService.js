import $api from ".";

export default class CategoriesService {
    static async getCategories() {
        return $api.get('/categories');
    }
    /* static async login(data) {
        return $api.post('/auth/login', data);
    }
    static async getRegisterToken() {
        return $api.get('/auth/registration');
    }
    static async getLoginToken() {
        return $api.get('/auth/login');
    } */
}