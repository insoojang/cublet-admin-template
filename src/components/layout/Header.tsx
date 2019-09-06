import React, { Component } from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Menu, Icon, Badge, Divider } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';

class Header extends Component<RouteComponentProps> {
    handleLinkAccount = () => {
        this.props.history.push('/account');
    }

    handleLogout = () => {
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
            </Menu>
        );
    }

    render() {
        return (
            <Layout.Header className="gyul-header">
                <div className="gyul-header-title">
                    <Breadcrumb>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard 1</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="gyul-header-noti">
                    <Badge dot>
                        <Icon onClick={this.handleLinkAlarm} className="gyul-header-noti-icon" type="notification" />
                    </Badge>
                </div>
                <Divider type="vertical" />
                <div className="gyul-header-account">
                    <Dropdown overlay={this.renderOverlayMenu} trigger={['click']}>
                        <Avatar className="gyul-account-avatar">
                            {'Admin'.charAt(0)}
                        </Avatar>
                    </Dropdown>
                </div>
            </Layout.Header>
        )
    }
}
export default withRouter(Header);
