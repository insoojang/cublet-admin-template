import {
    WEBSOCKET_CONNECT,
    WEBSOCKET_DISCONNECT,
    WEBSOCKET_SEND,
} from '../actions/websocket/WebsocketTypes';
import {
    closed,
    open,
    message,
    disconnect,
} from '../actions/websocket/WebsocketActions';
import { localStorage, ReduxAction } from '../../utils';

/**
 * Formats args for creating the WebSocket instance
 */
const extractArgs = (config: any) => {
    if (config.args) {
        return config.args;
    }
    if (config.url) {
        const accessToken = localStorage.read('access_token');
        return [`${config.url}?access_token=${accessToken}`];
    }

    return [];
};

/**
 * Create a websocket object from the incoming config
 */
const createWebsocket = (payload: any): WebSocket => {
    const args = extractArgs(payload);
    const websocket = (payload.websocket) ? payload.websocket : WebSocket;
    return new websocket(...args);
};

const WebsocketMiddleware = () => {
    const websockets = {} as any;
    /**
     * A function to create the WebSocket object and attach the standard callbacks
     */
    const initialize = ({ dispatch }: any, action: ReduxAction) => new Promise((resolve, reject) => {
        // Instantiate the websocket.
        const websocket = createWebsocket(action.payload);
        const splitUrl = action.payload.url.split('/');
        const type = splitUrl[splitUrl.length - 1];
        Object.assign(websockets, { [type]: websocket });
        // Setup handlers to be called like this:
        websocket.onopen = event => {
            dispatch(open(event));
            resolve(true);
        };
        websocket.onclose = event => {
            dispatch(closed(event, type));
            dispatch(disconnect({ type }));
            // if (type === 'rule-chain-debug') {
            //     dispatch(setDebugEnabled(false));
            // }
            if (websockets[type]) {
                console.info(`Closing WebSocket connection [${type}] ...`);
                websockets[type].close();
                websockets[type] = null;
            }
            reject(event);
        };
        websocket.onerror = event => {
            dispatch(closed(event, type));
            dispatch(disconnect({ type }));
            if (websockets[type]) {
                console.info(`Closing WebSocket connection [${type}] ...`);
                websockets[type].close();
                websockets[type] = null;
            }
            reject(event);
        };
        websocket.onmessage = event => dispatch(message(event));
    });

    /**
     * Close the WebSocket connection and cleanup
     */
    const close = ({ type }: any) => {
        if (websockets[type]) {
            console.info(`Closing WebSocket connection [${type}] ...`);
            websockets[type].close();
            websockets[type] = null;
        }
    };

    /**
     * Wait for the connection to be established.
     */
    const waitForSocketConnection = (websocket: any, callback: any) => {
        setTimeout(() => {
            if (websocket.readyState === 1) {
                if (callback !== undefined) {
                    callback();
                }
                return;
            }
            waitForSocketConnection(websocket, callback);
        }, 5);
    };

    /**
     * A function to send payload the WebSocket
     */
    const send = ({ type, subscriber }: any) => {
        if (websockets[type]) {
            waitForSocketConnection(websockets[type], () => {
                websockets[type].send(JSON.stringify(subscriber));
            });
        } else {
            console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first');
        }
    };

    /**
     * The primary Redux middleware function.
     * Each of the actions handled are user-dispatched.
     */
    return (store: any) => (next: any) => (action: any): void | Promise<any> => {
        switch (action.type) {
            // User request to connect
            case WEBSOCKET_CONNECT:
                if (websockets[action.payload.type]) {
                    next(action);
                    return new Promise((resolve, reject) => {
                        if (websockets[action.payload.type].readyState === 2 || websockets[action.payload.type].readyState === 3) {
                            reject('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first');
                        }
                        resolve(true);
                    });
                }
                if (!websockets[action.payload.type]) {
                    const promise = initialize(store, action);
                    next(action);
                    return promise;
                }
                break;
            // User request to disconnect
            case WEBSOCKET_DISCONNECT:
                close(action.payload);
                next(action);
                break;
            // User request to send a message
            case WEBSOCKET_SEND:
                send(action.payload);
                next(action);
                break;
            default:
                next(action);
                break;
        }
    };
};

export default WebsocketMiddleware();
