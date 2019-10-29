import React, { Component } from 'react';
import i18next from 'i18next';
import { hot } from 'react-hot-loader/root';

import ModuleContainer from './containers/ModuleContainer';
import LocaleContainer from './containers/LocaleContainer';
import Main from './Main';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import 'nprogress/nprogress.css';
import './styles/index.less';

interface IState {
    language?: string;
}

class App extends Component<{}, IState> {
    state: IState = {
        language: i18next.language,
    }

    componentDidMount() {
        i18next.on('languageChanged', () => {
            this.setState({
                language: i18next.language,
            });
        });
    }

    render() {
        const { language } = this.state;
        return (
            <ModuleContainer>
                <LocaleContainer language={language}>
                    <Main />
                </LocaleContainer>
            </ModuleContainer>
        )
    }
}
export default hot(App);
