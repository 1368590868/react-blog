import { request } from './http';

export class Axios {
    public static getArticle() {
        return request('/article/6218b68caa5c617aba1f5b690', 'get')
    }
}