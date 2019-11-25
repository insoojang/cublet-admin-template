import React, { Component } from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Menu, Icon, Badge, Divider } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import drop from 'lodash/drop';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ThemeContext } from '../../containers/ThemeContainer';
import { Websocket, Authentication } from '../../redux/actions';

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    logout: Authentication.Actions.logout,
    alarmSubscribe: Websocket.Actions.alarmSubscribe,
    alarmUnsubscribe: Websocket.Actions.alarmUnsubscribe,
}, dispatch);

type IProps = ReturnType<typeof mapDispatchToProps> & RouteComponentProps;

class Header extends Component<IProps> {
    static contextType = ThemeContext;

    componentDidMount() {
        this.props.alarmSubscribe();
    }

    componentWillUnmount() {
        this.props.alarmUnsubscribe();
    }

    handleLinkAccount = () => {
        this.props.history.push('/account');
    }

    handleLogout = () => {
        this.props.logout();
        this.props.history.push('/login');
    }

    handleLinkAlarm = () => {
        this.props.history.push('/alarm');
    }

    renderOverlayMenu = () => {
        return (
            <Menu>
                <Menu.Item onClick={this.handleLinkAccount}>
                    <Icon type="user" />
                    <span>My Account</span>
                </Menu.Item>
                <Menu.Item onClick={this.handleLogout}>
                    <Icon type="logout" />
                    <span>Logout</span>
                </Menu.Item>
                <Menu.Item onClick={() => this.context.changeTheme('light')}>
                    <Icon type="logout" />
                    <span>Light Theme</span>
                </Menu.Item>
                <Menu.Item onClick={() => this.context.changeTheme('dark')}>
                    <Icon type="logout" />
                    <span>Dark Theme</span>
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        const { location } = this.props;
        const { pathname } = location;
        const splitPathname = drop(pathname.split('/'));
        return (
            <Layout.Header className="cublet-header">
                <div className="cublet-header-title">
                    <Breadcrumb>
                        {
                            splitPathname.map((path, index) => {
                                if (splitPathname.length === 1 || index === splitPathname.length - 1) {
                                    return (
                                        <Breadcrumb.Item key={path}>
                                            {i18next.t(`${splitPathname[0]}.${path}`)}
                                        </Breadcrumb.Item>
                                    )
                                }
                                const linkPath = `/${Array.from({ length: index + 1 }, (v, i) => splitPathname[i]).join('/')}`;
                                return (
                                    <Breadcrumb.Item key={path}>
                                        <Link to={linkPath}>{i18next.t(`${splitPathname[0]}.${path}`)}</Link>
                                    </Breadcrumb.Item>
                                )
                            })
                        }
                    </Breadcrumb>
                </div>
                <div className="cublet-header-noti">
                    <Badge dot={true}>
                        <Icon onClick={this.handleLinkAlarm} className="cublet-header-noti-icon" type="notification" />
                    </Badge>
                </div>
                <Divider type="vertical" />
                <div className="cublet-header-account">
                    <Dropdown overlay={this.renderOverlayMenu} trigger={['click']}>
                        <Avatar className="cublet-account-avatar">
                            {'Admin'.charAt(0)}
                        </Avatar>
                    </Dropdown>
                </div>
            </Layout.Header>
        )
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));
