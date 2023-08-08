import axios, { AxiosRequestConfig, Method } from 'axios';
import { message } from 'antd';

// axios.defaults.baseURL = 'https://irlin.cn/api';
// axios.defaults.baseURL = 'http://114.115.157.58:3002/api';
axios.defaults.baseURL = 'http://127.0.0.1:3000/api';
axios.defaults.timeout = 5000;

message.config({
  duration: 5,
});

export const request = (url: string, method: Method, requestData?: object) => {
  let config: AxiosRequestConfig = {
    url,
    method,
  };

  // 如果是 GET 请求，使用 params 发送数据
  if (method === 'get') {
    config.params = requestData;
  } else {
    config.data = requestData;
  }

  return axios(config)
    .then((res) => res)
    .catch((error) => {
      message.error(error?.response?.data?.message ?? '网络错误');
      return false;
    });
};
