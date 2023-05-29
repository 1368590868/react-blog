import axios, { Method } from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = 'https://irlin.cn/api';
axios.defaults.timeout = 5000;

message.config({
    duration: 5
})

export const request = (url: string, method: Method, params?: object) => {
    return axios({
        url,
        method,
        params,
    })
        .then(res => res)
        .catch(() => {
            message.error('网络错误');
            return false
        });
};