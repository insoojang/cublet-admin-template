import React, { Component } from 'react';
import { withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import { Layout } from 'antd';

import { Header } from './components/layout';
import { ErrorPage } from './components/error';
import { IRoute } from './routes/routes';
import { MainMenu } from './components/menu';

interface IProps extends RouteComponentProps {
    routes: IRoute[];
}

class Container extends Component<IProps> {
    invalidPath = (routes: IRoute[], path: string) => {
        return routes.some((route: IRoute) => {
            const matched = matchPath(path, {
                exact: true,
                strict: true,
                path: route.path,
            });
            if (matched) {
                return true;
            }
            if (route.subRoutes) {
                const exist = this.invalidPath(route.subRoutes, path);
                if (exist) {
                    return true;
                }
            }
            return false;
        });
    };

    render() {
        const { location, children, routes } = this.props;
        let status = location && location.state && location.state.status;
        if (!status && location.pathname !== '/' && location.pathname !== '/login') {
            const invalid = this.invalidPath(routes, location.pathname);
            if (!invalid) {
                status = 404;
            }
        }
        return (
            <>
                <MainMenu routes={routes} />
                <Layout style={{ overflow: 'hidden' }}>
                    {
                        status === 0 || status ? (
                            <ErrorPage status={status} />
                        ) : (
                            <>
                                <Header />
                                {children}
                            </>
                        )
                    }
                </Layout>
            </>
        )
    }
}
export default withRouter(Container);
