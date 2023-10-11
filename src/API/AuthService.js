import $api from ".";

export default class AuthService {
    static async registration(data) {
        return $api.post('/registration', data);
    }
    static async login(data) {
        return $api.post('/login', data);
    }
    static async getRegisterToken() {
        return $api.get('/registration');
    }
    static async getLoginToken() {
        return $api.get('/login');
    }
}