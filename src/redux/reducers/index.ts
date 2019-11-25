import whitelabel from './whitelabel';
import websocket, { WebsocketReducer } from './websocket';

export interface RootReducer {
    whitelabel: any;
    websocket: WebsocketReducer;
}

const reducers: RootReducer = {
    whitelabel,
    websocket,
};

export default reducers;
