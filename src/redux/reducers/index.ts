import whitelabel from './whitelabel';
import websocket from './websocket';

export interface RootReducer {
    whitelabel: ReturnType<typeof whitelabel>;
    websocket: ReturnType<typeof websocket>;
}

const reducers = {
    whitelabel,
    websocket,
};

export default reducers;
