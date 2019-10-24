import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { i18nClient } from './i18n';
import { register } from './serviceWorker';
import App from './App';
import ThemeContainer from './containers/ThemeContainer';

i18nClient();

const rootEl = document.createElement('div');
rootEl.id = 'root';
document.body.appendChild(rootEl);

const render = (Component: React.ComponentClass) => {
    const rootElement = document.getElementById('root');
    ReactDOM.render(
        <AppContainer>
            <ThemeContainer>
                <Component />
            </ThemeContainer>
        </AppContainer>,
        rootElement,
    );
    register();
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
