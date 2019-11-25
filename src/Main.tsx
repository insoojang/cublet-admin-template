import React, { Component } from 'react';
import { Layout } from 'antd';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { Container, ThemeContainer } from './containers';
import { ModuleContext } from './containers/ModuleContainer';
import { IRoute } from './routes/routes';
import { routes as mainRoutes, extraRoutes } from './routes';
import { ModuleConfigurations } from './modules/AppModule';
import { store } from './redux/store';
import { localStorage } from './utils';

class Main extends Component {
    renderRoute = (route: IRoute) => <Route key={route.path} exact={true} strict={true} path={route.path} component={route.component} />

    renderRoutes = (routes: IRoute[]) => routes.reduce((prev, route) => {
        return prev.concat(
            <React.Fragment key={route.path}>
                {this.renderRoute(route)}
                {route.subRoutes && route.subRoutes.length ? this.renderRoutes(route.subRoutes) : null}
            </React.Fragment>,
        )
    }, []);

    render() {
        return (
            <ModuleContext.Consumer>
                {(configurations: ModuleConfigurations) => {
                    const { routes = mainRoutes } = configurations;
                    if (isEmpty(configurations)) {
                        return null;
                    }
                    return (
                        <Provider store={store(configurations)}>
                            <ThemeContainer theme={localStorage.read('theme')}>
                                <Layout className="cublet-app-container">
                                    <Helmet>
                                        <meta charSet="utf-8" />
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                        <meta name="description" content="Gyul Admin Template" />
                                        <link rel="manifest" href={`${PUBLIC_URL}manifest.json`} />
                                        <link rel="shortcut icon" href={`${PUBLIC_URL}favicon.png`} />
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
                                            {extraRoutes.map(route => this.renderRoute(route))}
                                            <Container routes={routes}>
                                                {this.renderRoutes(routes)}
                                            </Container>
                                        </Switch>
                                    </BrowserRouter>
                                </Layout>
                            </ThemeContainer>
                        </Provider>
                    );
                }}
            </ModuleContext.Consumer>
        )
    }
}

export default Main;
