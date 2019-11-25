import jwtDecode from 'jwt-decode';

import { localStorage, createActionsHelper, createActionHelper } from '../../../utils';
import { AuthenticationService } from '../../../services';
import { API_POST_REFRESH_TOKEN, VALIDATE_REFRESH, API_POST_LOGIN, LOGOUT } from './AuthenticationTypes';

export const clearAuthentication = () => {
    localStorage.remove('access_token');
    localStorage.remove('access_token_expiration');
    localStorage.remove('refresh_token');
    localStorage.remove('refresh_token_expiration');
};

const setJwtExpiredTime = (token: string, prefix: string) => {
    const tokenData = jwtDecode(token) as { exp: number, iat: number };
    const expTime = tokenData.exp * 1000;
    const issuedAt = tokenData.iat * 1000;
    if (issuedAt && expTime) {
        const ttl = expTime - issuedAt;
        if (ttl > 0) {
            const clientExpTime = new Date().valueOf() + ttl;
            localStorage.write(`${prefix}_expiration`, clientExpTime.toString());
        }
    }
};

export const setJwtToken = (token: string, tokenName: string) => {
    localStorage.write(tokenName, token);
    setJwtExpiredTime(token, tokenName);
};

export const isTokenValidate = (prefix: string) => {
    const token = localStorage.read(prefix);
    if (token) {
        const expiration = parseInt(localStorage.read(`${prefix}_expiration`), 10);
        return expiration && expiration > new Date().valueOf();
    }
    return false;
};

const getRefreshTokenActions = createActionsHelper(API_POST_REFRESH_TOKEN);

const getRefreshTokenRequest = (refreshToken: string) => (dispatch: any) => {
    dispatch(getRefreshTokenActions.REQUEST());
    return AuthenticationService.refreshToken(refreshToken)
        .then(response => {
            setJwtToken(response.data.access_token, 'access_token');
            dispatch(getRefreshTokenActions.SUCCESS());
        }).catch(error => {
            clearAuthentication();
            dispatch(getRefreshTokenActions.FAILURE(error.message));
        });
};

const validateRefreshActions = createActionsHelper(VALIDATE_REFRESH);

export const validateJwtToken = () => {
    const promise = (dispatch: any) => new Promise((resolve, reject) => {
        if (isTokenValidate('access_token')) {
            resolve(true);
            dispatch(validateRefreshActions.SUCCESS());
        } else {
            if (isTokenValidate('refresh_token')) {
                const refreshToken = localStorage.read('refresh_token');
                dispatch(getRefreshTokenRequest(refreshToken));
            } else {
                reject(false);
                clearAuthentication();
                dispatch(validateRefreshActions.FAILURE());
            }
        }
    });
    return promise;
};

const loginActions = createActionsHelper(API_POST_LOGIN);

export const login = (userId: string, password: string) => (dispatch: any) => {
    dispatch(loginActions.REQUEST());
    return AuthenticationService.login(userId, password)
        .then(response => {
            setJwtToken(response.data.access_token, 'access_token');
            setJwtToken(response.data.refresh_token, 'refresh_token');
            localStorage.write('user_id', userId);
            dispatch(loginActions.SUCCESS());
            return response;
        }).catch(error => {
            dispatch(loginActions.FAILURE(error.message));
            throw error;
        });
};

const logoutAction = createActionHelper(LOGOUT.SUCCESS);

export const logout = () => (dispatch: any) => {
    clearAuthentication();
    dispatch(logoutAction());
};
