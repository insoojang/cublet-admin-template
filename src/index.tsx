import React from 'react';
import ReactDOM from 'react-dom';

import { i18nClient } from './i18n';
import { register } from './serviceWorker';
import App from './App';

i18nClient();

const rootEl = document.createElement('div');
rootEl.id = 'root';
document.body.appendChild(rootEl);

const render = async (Component: React.ComponentClass<any>) => {
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <Component />,
        rootElement,
    );
    register();
};

render(App);
