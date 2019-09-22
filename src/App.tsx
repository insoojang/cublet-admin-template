import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import i18next from 'i18next';

import { Login } from './components/login';
import Container from './Container';

import LocaleContainer from './LocaleContainer';
import { routes } from './routes';
import { IRoute } from './routes/routes';

import './styles/index.less';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

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

    getRoutes = (routes: IRoute[]) => routes.reduce((prev, route) => {
        return prev.concat(
            <Switch key={route.path}>
                <Route exact={true} strict={true} path={route.path} component={route.component} />
                {route.subRoutes && (
                    route.subRoutes.map(subRoute =>
                        <Route key={subRoute.path} exact={true} strict={true} path={subRoute.path} component={subRoute.component} />))}
            </Switch>,
        )
    }, []);

    render() {
        const { language } = this.state;
        return (
            <LocaleContainer language={language}>
                <Layout className="gyul-app-container">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta name="description" content="Gyul Admin Template" />
                        <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                    </Helmet>
                    <BrowserRouter>
                        <Switch>
                            <Route
                                path="/"
                                exact={true}
                                render={() => {
                                    return <Redirect to="/dashboard" />
                                }}
                            />
                            <Route
                                path="/login"
                                component={Login}
                            />
                            <Container routes={routes}>
                                {this.getRoutes(routes)}
                            </Container>
                        </Switch>
                    </BrowserRouter>
                </Layout>
            </LocaleContainer>
        )
    }
}
export default App;
