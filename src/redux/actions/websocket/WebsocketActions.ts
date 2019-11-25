import uuid from 'uuid';
import isEmpty from 'lodash/isEmpty';

import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_SEND,
    WEBSOCKET_OPEN,
    WEBSOCKET_CLOSED,
    WEBSOCKET_MESSAGE,
    SUBSCRIBER,
    UNSUBSCRIBER,
} from './WebsocketTypes';
import { localStorage } from '../../../utils';
import { WebsocketSubscriber, WebsocketType } from '../../reducers/websocket';

export interface WebsocketSubscription extends WebsocketSubscriber {
    type: WebsocketType;
}

const connect = (payload: any) => {
    return {
        type: WEBSOCKET_CONNECT,
        payload,
    };
};

const expireConnect = (type: string) => {
    return {
        type: WEBSOCKET_DISCONNECT,
        payload: {
            type,
        },
    };
};

const send = (payload: any) => {
    return {
        type: WEBSOCKET_SEND,
        payload,
    };
};

export const open = (event: any) => {
    return {
        type: WEBSOCKET_OPEN,
        payload: {
            timestamp: new Date().valueOf(),
            event,
        },
    };
};

export const closed = (event: any, type: string) => {
    return {
        type: WEBSOCKET_CLOSED,
        payload: {
            timestamp: new Date().valueOf(),
            event,
            type,
        },
    };
};

export const message = (event: any) => {
    return {
        type: WEBSOCKET_MESSAGE,
        payload: {
            timestamp: new Date(),
            data: event.data,
            url: event.currentTarget.url,
        },
    };
};

const getWsUrl = () => JSON.parse(localStorage.read('configuration')).wsUrl;

export const disconnect = (subscription: WebsocketSubscription) => (dispatch: any) => {
    const { type } = subscription;
    dispatch(expireConnect(type));
};

export const subscribe = (type: WebsocketType, key: string, subscriber: WebsocketSubscriber) => (dispatch: any, getState: any) => {
    const url = `${getWsUrl()}/api/ws/${type}`;
    const cmdId = uuid();
    Object.assign(subscriber, { cmdId });
    const payload = {
        type,
        url,
        key,
        subscriber,
        subType: SUBSCRIBER,
    };
    const { websocket } = getState();
    const sub = websocket.websockets[type].subscribers[key];
    if (!isEmpty(sub)) {
        console.warn('[WARNING] Already exists subscriber', sub);
        return;
    }
    if (websocket.websockets[type].isOpened) {
        dispatch(send(payload));
    } else {
        dispatch(connect(payload)).then(() => {
            dispatch(send(payload));
        }).catch((error: any) => {
            console.error(error);
            disconnect(payload)(dispatch);
        });
    }
};

export const unsubscribe = (type: WebsocketType, key: string, subscriber: WebsocketSubscriber) => (dispatch: any, getState: any) => {
    return new Promise((resolve, reject) => {
        const { websocket } = getState();
        const sub = websocket.websockets[type].subscribers[key];
        if (isEmpty(sub)) {
            console.warn('[WARNING] Does not exists subscriber', sub);
            reject(`[WARNING] Does not exists subscriber', ${JSON.stringify(sub)}`);
        } else {
            const url = `${getWsUrl()}/api/ws/${type}`;
            Object.assign(subscriber, { cmdId: sub.cmdId });
            const payload = {
                type,
                url,
                key,
                subscriber,
                subType: UNSUBSCRIBER,
            };
            dispatch(send(payload));
            resolve();
        }
    });
};

export const measurementSubscribe = (subscription: WebsocketSubscription) => (dispatch: any, getState: any) => {
    if (Object.keys(subscription).length === 0) {
        return;
    }
    const key = subscription.widgetId
    ? `${subscription.widgetId}_${subscription.resourceId}_${subscription.keys}`
    : `${subscription.resourceId}_${subscription.keys}`;
    const subscriber = {
        resourceId: subscription.resourceId,
        keys: subscription.keys,
    };
    subscribe('measurement', key, subscriber)(dispatch, getState);
};

export const measurementUnsubscribe = (subscription: WebsocketSubscription) => (dispatch: any, getState: any) => {
    const { widgetId } = subscription;
    let key;
    const subscriber = {};
    if (widgetId) {
        key = `${subscription.widgetId}_${subscription.resourceId}_${subscription.keys}`;
    } else {
        key = `${subscription.resourceId}_${subscription.keys}`;
    }
    Object.assign(subscriber, {
        resourceId: subscription.resourceId,
        keys: subscription.keys,
        unsubscribe: true,
    });
    return unsubscribe('measurement', key, subscriber)(dispatch, getState);
};

export const alarmSubscribe = () => (dispatch: any, getState: any) => {
    const subscriber = {};
    subscribe('alarm', 'alarm', subscriber)(dispatch, getState);
};

export const alarmUnsubscribe = () => (dispatch: any, getState: any) => {
    return unsubscribe('alarm', 'alarm', Object.assign({}, { unsubscribe: true }))(dispatch, getState);
};

export const debugSubscribe = (ruleChainId: string) => (dispatch: any, getState: any) => {
    if (!ruleChainId && !ruleChainId.length) {
        console.warn('Does not ruleChainId', ruleChainId);
        return;
    }
    subscribe('rule-chain-debug', 'debug', Object.assign({}, { ruleChainId }))(dispatch, getState);
};

export const debugUnsubscribe = () => (dispatch: any, getState: any) => {
    const { websocket } = getState();
    const sub = websocket.websockets['rule-chain-debug'].subscribers.debug;
    let ruleChainId;
    if (sub) {
        ruleChainId = sub.ruleChainId;
    }
    return unsubscribe('rule-chain-debug', 'debug', Object.assign({}, { unsubscribe: true, ruleChainId }))(dispatch, getState);
};
