import axios from 'axios';
import { DOMAIN, TOKEN, TOKEN_CYBER } from './varsSetting'

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 3000
});

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'tokenCybersoft': TOKEN_CYBER,
        'token': localStorage.getItem(TOKEN)
    };
    return config;
}, (errors) => {
    return Promise.reject(errors);
})