import axios, { AxiosInstance, Method, AxiosError, AxiosResponse, AxiosPromise } from 'axios';
import qs from 'qs';
import { createBrowserHistory } from 'history';

import { localStorage } from '../utils';
import { isTokenValidate, setJwtToken, clearAuthentication } from '../redux/actions/authentication/AuthenticationActions';
import { AUTHENTICATION_URL } from './api/authentication/AuthenticationService';

export type ResponseType = 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream';

const history = createBrowserHistory();

const instance = axios.create({
    baseURL: JSON.parse(localStorage.read('configuration')).baseUrl,
    timeout: 30000,
    withCredentials: true,
});

const requestInterceptor = (method: Method, url: string, data?: any, headers?: any, responseType?: ResponseType) => {
    let defaultHeaders = {};
    const token = localStorage.read('access_token');
    if (token) {
        defaultHeaders = {
            Authorization: `Bearer ${token}`,
        };
    }
    const options = {
        method,
        url,
        responseType: responseType || 'json',
        headers: defaultHeaders,
        paramsSerializer: (params: any) => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
    } as { [key: string]: any };
    if (data && (method === 'GET' || method === 'DELETE')) {
        options.params = data;
    } else if (data) {
        options.data = data;
        options.headers = Object.assign(options.headers, {
            'Content-Type': 'application/json',
        });
    }
    if (headers) {
        options.headers = Object.assign(options.headers, headers);
    }
    return new Promise<AxiosResponse>((resolve, reject) => {
        return instance.request(options)
            .then(response => {
                resolve(response);
            }).catch((error: AxiosError) => {
                if (error.response) {
                    error.message = error.response.data ? error.response.data.message : `${error.response.status} ${error.response.statusText}`;
                } else {
                    error.message = error.message || error.code;
                }
                reject(error);
            });
    });
};

const validateRequest = (method: Method, url: string, data?: any, headers?: any, responseType?: ResponseType): AxiosPromise => {
    if (!isTokenValidate('access_token')) {
        if (url !== AUTHENTICATION_URL.API_LOGIN_URL) {
            let refreshToken = localStorage.read('refresh_token');
            if (url === AUTHENTICATION_URL.API_REFRESH_TOKEN_URL) {
                return requestInterceptor(method, url, data, headers, responseType);
            }
            if (!isTokenValidate('refresh_token')) {
                refreshToken = null;
            }
            return requestInterceptor('POST', AUTHENTICATION_URL.API_REFRESH_TOKEN_URL, null, {
                Authorization: `Bearer ${refreshToken}`,
            }).then(response => {
                setJwtToken(response.data.access_token, 'access_token');
                return requestInterceptor(method, url, data, headers, responseType);
            }).catch(error => {
                console.error('[ERROR] Invalid token', error);
                clearAuthentication();
                throw error;
            });
        }
    }
    return requestInterceptor(method, url, data, headers, responseType);
};

const client = {
    /**
     * @description Client get request
     * @param {string} url
     * @param {*} [data]
     * @param {*} [headers]
     * @param {ResponseType} [responseType]
     * @param {boolean} [noauth]
     * @returns
     */
    get(url: string, data?: any, headers?: any, responseType?: ResponseType, noauth?: boolean) {
        if (noauth) {
            return requestInterceptor('GET', url, data, headers, responseType);
        }
        return validateRequest('GET', url, data, headers, responseType);
    },
    /**
     * @description Client post request
     * @param {string} url
     * @param {*} [data]
     * @param {*} [headers]
     * @param {ResponseType} [responseType]
     * @param {boolean} [noauth]
     * @returns
     */
    post(url: string, data?: any, headers?: any, responseType?: ResponseType, noauth?: boolean) {
        if (noauth) {
            return requestInterceptor('POST', url, data, headers, responseType);
        }
        return validateRequest('POST', url, data, headers, responseType);
    },
    /**
     * @description Client delete request
     * @param {string} url
     * @param {*} [data]
     * @param {*} [headers]
     * @param {ResponseType} [responseType]
     * @param {boolean} [noauth]
     * @returns
     */
    delete(url: string, data?: any, headers?: any, responseType?: ResponseType, noauth?: boolean) {
        if (noauth) {
            return requestInterceptor('DELETE', url, data, headers, responseType);
        }
        return validateRequest('DELETE', url, data, headers, responseType);
    },
    /**
     * @description Client put request
     * @param {string} url
     * @param {*} [data]
     * @param {*} [headers]
     * @param {ResponseType} [responseType]
     * @param {boolean} [noauth]
     * @returns
     */
    put(url: string, data?: any, headers?: any, responseType?: ResponseType, noauth?: boolean) {
        if (noauth) {
            return requestInterceptor('PUT', url, data, headers, responseType);
        }
        return validateRequest('PUT', url, data, headers, responseType);
    },
    /**
     * @description Client patch request
     * @param {string} url
     * @param {*} [data]
     * @param {*} [headers]
     * @param {ResponseType} [responseType]
     * @param {boolean} [noauth]
     * @returns
     */
    patch(url: string, data?: any, headers?: any, responseType?: ResponseType, noauth?: boolean) {
        if (noauth) {
            return requestInterceptor('PATCH', url, data, headers, responseType);
        }
        return validateRequest('PATCH', url, data, headers, responseType);
    },
    /**
     * @description Client multiple requests
     * @param {AxiosInstance[]} requests
     * @returns
     */
    all(requests: AxiosInstance[]) {
        return Promise.all(requests);
    },
};

export default client;
