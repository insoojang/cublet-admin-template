import React, { Component } from 'react';
import { Layout, Breadcrumb, Avatar } from 'antd';

class Header extends Component {
    render() {
        return (
            <Layout.Header className="gyul-header">
                <div className="gyul-header-title">
                    <Breadcrumb>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard 1</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="gyul-header-account">
                    <Avatar>{'Admin'.charAt(0)}</Avatar>
                </div>
            </Layout.Header>
        )
    }
}
export default Header;
