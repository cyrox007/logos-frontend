import {createStore} from 'vuex';

export default createStore({
    state: {
        auth: false
    },
    getters: {
        isAuth (state) {
            return state.auth;
        }
    },
    mutations: {
        setAuth(state, status) {
            state.auth = status;
        }
    }
});