import update from 'immutability-helper';
import {
    WEBSOCKET_OPEN,
    WEBSOCKET_CLOSED,
    WEBSOCKET_MESSAGE,
    WEBSOCKET_SEND,
    UNSUBSCRIBER,
    SUBSCRIBER,
} from '../actions/websocket/WebsocketTypes';
import { ReduxAction } from '../../utils';

export type WebsocketType = 'measurement' | 'alarm' | 'rule-chain-debug';

export interface WebsocketSubscriber {
    cmdId?: string | number;
    unsubscribe?: boolean;
    [key: string]: any;
}

export interface WebsocketConfig {
    isOpened: boolean;
    readyState: number;
    timestamp: number;
    subscribers: WebsocketSubscriber;
}

export interface WebsocketReducer {
    websockets: { [key in WebsocketType]: WebsocketConfig };
    subscriptions: { [key in WebsocketType]: { data: any } };
}

interface IPayload {
    type: WebsocketType;
    event: any;
    timestamp: number;
    data: any;
    url: string;
    subType: 'SUBSCRIBER' | 'UNSUBSCRIBER';
    key: string;
    subscriber: WebsocketSubscriber;
}

const initialState: WebsocketReducer = {
    websockets: {
        // tslint:disable-next-line: object-literal-key-quotes
        measurement: {
            isOpened: false,
            readyState: 0,
            timestamp: 0,
            subscribers: {},
        },
        alarm: {
            isOpened: false,
            readyState: 0,
            timestamp: 0,
            subscribers: {},
        },
        'rule-chain-debug': {
            isOpened: false,
            readyState: 0,
            timestamp: 0,
            subscribers: {},
        },
    },
    subscriptions: {
        measurement: {
            data: {},
        },
        alarm: {
            data: {},
        },
        'rule-chain-debug': {
            data: {},
        },
    },
};

const websocket = (state = initialState, action: ReduxAction<IPayload>) => {
    switch (action.type) {
        case WEBSOCKET_OPEN:
            if (action.payload.event) {
                const splitUrl = action.payload.event.currentTarget.url.split('/');
                const type = splitUrl[splitUrl.length - 1].split('?')[0] as WebsocketType;
                const { subscribers } = state.websockets[type];
                return update(state, {
                    websockets: {
                        $merge: {
                            [type]: {
                                isOpened: true,
                                readyState: action.payload.event.currentTarget.readyState,
                                timestamp: action.payload.timestamp,
                                subscribers,
                            },
                        },
                    },
                    subscriptions: {
                        $merge: {
                            [type]: {
                                data: {},
                            },
                        },
                    },
                });
            }
            return state;
        case WEBSOCKET_CLOSED:
            state.websockets[action.payload.type] = {
                ...initialState.websockets[action.payload.type],
                timestamp: action.payload.timestamp,
                readyState: action.payload.event.currentTarget.readyState,
            };
            state.subscriptions[action.payload.type] = {
                ...initialState.subscriptions[action.payload.type],
            };
            return update(state, {
                websockets: {
                    $set: state.websockets,
                },
                subscriptions: {
                    $set: state.subscriptions,
                },
            });
        case WEBSOCKET_MESSAGE:
            // Assuming that your data is a DOMString in JSON format
            if (action.payload.data) {
                const data = JSON.parse(action.payload.data);
                const splitUrl = action.payload.url.split('/');
                const type = splitUrl[splitUrl.length - 1].split('?')[0];
                return update(state, {
                    subscriptions: {
                        [type]: {
                            data: {
                                $merge: data,
                            },
                        },
                    },
                });
            }
            return state;
        case WEBSOCKET_SEND:
            if (action.payload.subType === SUBSCRIBER) {
                if (state.websockets[action.payload.type]) {
                    return update(state, {
                        websockets: {
                            [action.payload.type]: {
                                subscribers: {
                                    $merge: { [action.payload.key]: action.payload.subscriber },
                                },
                            },
                        },
                    });
                }
                return state;
            } else if (action.payload.subType === UNSUBSCRIBER) {
                if (state.websockets[action.payload.type].subscribers[action.payload.key]) {
                    delete state.websockets[action.payload.type].subscribers[action.payload.key];
                    return update(state, {
                        websockets: {
                            [action.payload.type]: {
                                $set: state.websockets[action.payload.type] || {},
                            },
                        },
                        subscriptions: {
                            [action.payload.type]: {
                                $set: {
                                    data: {},
                                },
                            },
                        },
                    });
                }
                return state;
            }
            return state;
        default:
            return state;
    }
};

export default websocket;
