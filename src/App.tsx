import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Login } from './components/login';
import Container from './Container';

import { routes } from './routes';
import { IRoute } from './routes/routes';
import './styles/index.less';

class App extends Component {
    getRoutes = (routes: IRoute[]) => routes.reduce((prev, route) => {
        return prev.concat(
            <Switch key={route.path}>
                <Route exact strict path={route.path} component={route.component} />
                {route.routes && (
                    route.routes.map((subRoute) =>
                        <Route key={subRoute.path} exact strict path={subRoute.path} component={subRoute.component} />))}
            </Switch>
        )
    }, []);


    render() {
        const mainRoutes = this.getRoutes(routes);
        return (
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
                            path="/login"
                            component={Login}
                        />
                        <Container routes={routes}>
                            {mainRoutes}
                        </Container>
                    </Switch>
                </BrowserRouter>
            </Layout>
        )
    }
}
export default App;
