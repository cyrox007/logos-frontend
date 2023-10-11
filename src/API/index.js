import axios from "axios";
import Config from '@/Config'

export const API_URL = Config.server;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});

const errLogClassification = (msg) => {
    if (msg === 'csrf_error') {
        return `/security/csrf`;
    } 
    
    if (msg === 'fast_filling_form') {
        return `/security/bot-detected`;
    }

    return null;
}

$api.interceptors.response.use((config)=>{
    return config;
}, async (error) => {
    const originalRequest = error.config;
    let body = {
        requestBody: originalRequest
    }
    if (error.response.status === 403 && !error.config._isRetry) {
        originalRequest._isRetry = true;
        let err = JSON.parse(error.request.response);
        
        const url = errLogClassification(err.error);
        if (url === null) { return; }
        
        try {
            const response = await $api.post(url, body);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
});

export default $api;