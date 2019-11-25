/*
    Creates $NAME_REQUEST, $NAME_SUCESS, $NAME_FAILURE actions
    accessed by $NAME.$STATE, e.g. FETCH_MESSAGE.REQUEST
*/
import { createAction, ActionFunctionAny } from 'redux-actions';
import update from 'immutability-helper';
import { AxiosPromise } from 'axios';
import { Dispatch } from 'redux';

export const INIT = 'INIT';
export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const PUSH = 'PUSH';
export const UNSHIFT = 'UNSHIFT';
export const SPLICE = 'SPLICE';
export const SET = 'SET';
export const UNSET = 'UNSET';
export const MERGE = 'MERGE';
export const APPLY = 'APPLY';

export const TYPES = {
    INIT, REQUEST, SUCCESS, FAILURE,
};

export const COMMAND = {
    MERGE, SET, PUSH,
};

export interface ReduxAction<P extends any = any, T extends any = string> {
    payload: P;
    type: T;
}

export interface ReduxActionTypes<T extends any = string> {
    INIT?: T;
    REQUEST?: T;
    SUCCESS?: T;
    FAILURE?: T;
}

export type ReduxActionType = 'INIT' | 'REQUEST' | 'SUCCESS' | 'FAILURE';

export type ReduxActionCommand = 'PUSH' | 'SET' | 'MERGE';

export type ReduxAPIService = (...args: any) => AxiosPromise;

/**
 * Action Type을 생성해주는 함수.
 * @param {string} base Action의 베이스 문자
 * @return {ReduxActionTypes}
 */
export const createActionTypes = (base: string) => {
    return [INIT, REQUEST, SUCCESS, FAILURE].reduce((acc: ReduxActionTypes, type: string) => {
        return Object.assign(acc, { [type]: `${base}_${type}` });
    }, {} as ReduxActionTypes);
};

/**
 * 단일 Action을 생성해주는 함수.
 * @param {string} base Action의 베이스 문자
 * @return {ReduxActions.ActionFunctionAny<ReduxActions.Action<any>>}
 */
export const createActionHelper = (base: string) => {
    return createAction(base);
};

/**
 * Action type별로 Action을 생성해주는 함수.
 * @param {ReduxActionTypes} base Action의 베이스 문자
 * @return {ReduxActionTypes<ActionFunctionAny<any>>}
 */
export const createActionsHelper = (base: ReduxActionTypes) => {
    return Object.keys(base).reduce((acc: ReduxActionTypes<ActionFunctionAny<any>>, type: string) => {
        return Object.assign(acc, { [type]: createAction(base[type as ReduxActionType]) });
    }, {} as ReduxActionTypes<ActionFunctionAny<any>>);
};

/**
 * 비동기 Action을 생성해주는 함수.
 * @param {ReduxActionTypes} base Action의 베이스 문자
 * @param {ReduxAPIService} api 비동기 Service API
 * @param {*} payload Action 페이로드
 * @param {*} headers Service API의 헤더 값
 * @return
 */
export const createRequestHelper = (base: ReduxActionTypes, api: ReduxAPIService, payload?: any, headers?: any) => (dispatch: Dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    return api(payload, headers).then(response => {
        dispatch(actionCreators.SUCCESS(response.data));
        return response;
    }).catch(error => {
        if (!error.response) {
            const data = {
                message: error.message,
                status: 0,
            };
            dispatch(actionCreators.FAILURE(data));
        } else {
            dispatch(actionCreators.FAILURE(error.response.data));
        }
        throw error;
    });
};

export const createRequestHelperV1 = (base: Record<string, string>, api: ReduxAPIService, payload?: any, headers?: any) => () => (dispatch: Dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    return api(payload, headers).then(response => {
        dispatch(actionCreators.SUCCESS(response.data));
        return response;
    }).catch(error => {
        if (!error.response) {
            const data = {
                message: error.message,
                status: 0,
            };
            dispatch(actionCreators.FAILURE(data));
        } else {
            dispatch(actionCreators.FAILURE(error.response.data));
        }
        throw error;
    });
};

export const createAsyncRequestHelper = (base: Record<string, string>, api: ReduxAPIService, payload?: any, headers?: any) => async (dispatch: Dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    try {
        const response = await api(payload, headers);
        dispatch(actionCreators.SUCCESS(response.data));
        return response;
    } catch (error) {
        if (!error.response) {
            const data = {
                message: error.message,
                status: 0,
            };
            dispatch(actionCreators.FAILURE(data));
        } else {
            dispatch(actionCreators.FAILURE(error.response.data));
        }
        throw error;
    }
};

export const createAsyncRequestHelperV1 = (base: Record<string, string>, api: ReduxAPIService, payload?: any, headers?: any) => () => async (dispatch: Dispatch) => {
    const actionCreators = createActionsHelper(base);
    dispatch(actionCreators.REQUEST(payload));
    try {
        const response = await api(payload, headers);
        dispatch(actionCreators.SUCCESS(response.data));
    } catch (error) {
        if (!error.response) {
            const data = {
                message: error.message,
                status: 0,
            };
            dispatch(actionCreators.FAILURE(data));
        } else {
            dispatch(actionCreators.FAILURE(error.response.data));
        }
        throw error;
    }
};

/**
 * Reducer Update 함수
 * @param {*} state Reducer State
 * @param {ReduxActionType} actionType Action 종류
 * @param {*} payload Action 페이로드
 * @param {ReduxActionCommand} command SET, MERGE, PUSH
 */
export const updateReducer = (state: any, actionType?: ReduxActionType, payload?: any, command?: ReduxActionCommand) => {
    if (!payload) {
        return update(state, {
            statusMessage: {
                $set: actionType,
            },
        });
    }
    return Object.keys(payload).reduce((prev, curr) => {
        if (command === SET) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $set: payload[curr],
                },
            });
        } else if (command === MERGE) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $merge: payload[curr],
                },
            });
        } else if (command === PUSH) {
            return update(prev, {
                statusMessage: {
                    $set: actionType,
                },
                [curr]: {
                    $push: payload[curr],
                },
            });
        }
        return update(prev, {
            statusMessage: {
                $set: actionType,
            },
            [curr]: {
                $set: payload[curr],
            },
        });
    }, state);
};
