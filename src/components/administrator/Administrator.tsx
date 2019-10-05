import React, { Component } from 'react';
import { Route } from 'react-router';

import { Content } from '../layout';
import { routes } from '../../routes';
import { IRoute } from '../../routes/routes';
import { AdministratorMenu } from '../menu';

class Administrator extends Component {
    renderRoutes = (routes: IRoute[]) => routes.reduce((prev, route) => {
        return prev.concat(
            <React.Fragment key={route.path}>
                <Route path={route.path} component={route.subComponent} />
                {route.subRoutes && this.renderRoutes(route.subRoutes)}
            </React.Fragment>,
        );
    }, [])

    render() {
        const adminRoute = routes.filter(route => route.path === '/administrator')[0];
        return (
            <Content scroll={false}>
                <AdministratorMenu routes={adminRoute.subRoutes} />
                {this.renderRoutes(adminRoute.subRoutes)}
            </Content>
        )
    }
}

export default Administrator;
