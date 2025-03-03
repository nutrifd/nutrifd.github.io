import { Notification } from '@arco-design/web-react';
import axios from 'axios';
import Host from "./host"

const errorHandler = function (err) {
    const {message, code} = err;
    Notification.error({
        title: message,
        content: code ? `错误码: ${code}`: '',
        duration: 5000,
    });
};

axios.defaults.withCredentials = false
const request = axios.create({
    baseURL: Host.baseUrl,
    timeout: 8000,
});

request.interceptors.response.use(
    response => {
        const {data} = response;
        if(!response.data) {
            return Promise.reject(response)
        }
        if (data.code === 0) {
            return response.data
        }
        errorHandler({
            message: data.error,
            code: data.code,
        })
        return Promise.reject(response)
    },
    error => {
        console.log(error)
        return Promise.reject(error)
   }
);

export default request;

export const defaultLimit = 10;
export const defaultOffset = 0;
export function defaultPagination(params) {
    if (!params.hasOwnProperty('limit')) {
        params.limit = defaultLimit;
    }
    if (!params.hasOwnProperty('offset')) {
        params.limit = defaultOffset;
    }
    return params
}