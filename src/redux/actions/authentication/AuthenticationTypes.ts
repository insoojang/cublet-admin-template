import { createActionTypes } from '../../../utils';

export const API_POST_LOGIN = createActionTypes('API_POST_LOGIN');
export const API_POST_REFRESH_TOKEN = createActionTypes('API_POST_REFRESH_TOKEN');
export const LOGOUT = createActionTypes('LOGOUT');
export const VALIDATE_REFRESH = createActionTypes('VALIDATE_REFRESH');
