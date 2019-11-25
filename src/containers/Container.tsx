import React, { Component } from 'react';
import { withRouter, RouteComponentProps, matchPath, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Header } from '../components/layout';
import { ErrorPage } from '../components/error';
import { IRoute } from '../routes/routes';
import { MainMenu } from '../components/menu';
import { Authentication } from '../redux/actions';

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    validateJwtToken: Authentication.Actions.validateJwtToken,
}, dispatch);

type IProps = ReturnType<typeof mapDispatchToProps> & RouteComponentProps & {
    routes: IRoute[];
}

interface IState {
    isLoggedIn?: boolean;
}

class Container extends Component<IProps, IState> {
    state: IState = {
        isLoggedIn: true,
    }

    async componentDidMount() {
        try {
            await this.props.validateJwtToken();
            this.setState({
                isLoggedIn: true,
            });
        } catch (error) {
            this.setState({
                isLoggedIn: false,
            });
        }
    }

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
        const { isLoggedIn } = this.state;
        if (!isLoggedIn) {
            return <Redirect to="/login" />;
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
export default withRouter(connect(null, mapDispatchToProps)(Container));
