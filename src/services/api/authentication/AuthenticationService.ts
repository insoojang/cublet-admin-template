import client from '../../client';

export const AUTHENTICATION_URL = {
    API_LOGIN_URL: '/api/auth/login',
    API_REFRESH_TOKEN_URL: '/api/auth/token',
    API_ACCOUNT_LOCKOUT: '/api/noauth/account-lockout',
};

export const login = (userId: string, password: string) =>
    client.post(AUTHENTICATION_URL.API_LOGIN_URL, { userId, password });

export const refreshToken = (token: string) =>
    client.post(AUTHENTICATION_URL.API_REFRESH_TOKEN_URL, null, { Authorization: `Bearer ${token}` });

export const getAccountLockoutCount = () => client.get(AUTHENTICATION_URL.API_ACCOUNT_LOCKOUT, null, null, null, true);
