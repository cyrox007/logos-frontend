import {createStore} from 'vuex';

export default createStore({
    state: {
        auth: Boolean(localStorage.getItem('auth')) || false,
        role: Number(localStorage.getItem("role")) || 0
    },
    getters: {
        isAuth (state) {
            return state.auth;
        },
        getRole(state) {
            return state.role;
        }
    },
    mutations: {
        setAuth(state, status) {
            state.auth = status;
        },
        setRole(state, role) {
            state.role = role;
        }
    }
});