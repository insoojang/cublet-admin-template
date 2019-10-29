import React, { Component } from 'react';
import { Layout } from 'antd';
import Helmet from 'react-helmet';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { Container, ThemeContainer } from './containers';
import { ModuleContext } from './containers/ModuleContainer';
import { Login } from './components/login';
import { IRoute } from './routes/routes';
import { routes as mainRoutes, extraRoutes } from './routes';
import { ModuleConfigurations } from './modules/AppModule';

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
                    return (
                        <ThemeContainer theme={localStorage.getItem('theme')}>
                            <Layout className="gyul-app-container">
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
                                        <Route
                                            path="/login"
                                            component={Login}
                                        />
                                        {extraRoutes.map(route => this.renderRoute(route))}
                                        <Container routes={routes}>
                                            {this.renderRoutes(routes)}
                                        </Container>
                                    </Switch>
                                </BrowserRouter>
                            </Layout>
                        </ThemeContainer>
                    );
                }}
            </ModuleContext.Consumer>
        )
    }
}

export default Main;
