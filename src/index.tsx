import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';

const rootEl = document.createElement('div');
rootEl.id = 'root';
document.body.appendChild(rootEl);

const render = (Component: React.ComponentClass) => {
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        rootElement,
    )
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}