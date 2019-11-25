import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import websocketMiddleware from '../middleware/websocketMiddleware';
import { ModuleConfigurations } from '../../modules/AppModule';

const configureStore = (configurations: ModuleConfigurations) => {
    const reducer = combineReducers(configurations.reducers);
    let store: any;
    const enhancer = applyMiddleware(thunkMiddleware, websocketMiddleware);
    if (process.env.NODE_ENV === 'development') {
        store = createStore(reducer, composeWithDevTools(enhancer));
    } else {
        store = createStore(reducer, enhancer);
    }
    if (module.hot) {
        module.hot.accept(JSON.stringify(configurations.reducers), () => {
            store.replaceReducer(configurations.reducers);
        });
    }
    return store;
}

export default configureStore;
