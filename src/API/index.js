import axios from 'axios';
import Config from '@/Config';

export const API_URL = Config.server;

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: false,
    timeout: 10000,
    headers: {
        Accept: 'application/json'
    }
});

$api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default $api;
