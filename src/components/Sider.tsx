import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

class Sider extends Component {
    render() {
        return (
            <Layout.Sider collapsible={true}>
                <div className="gyul-menu-logo" />
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="dashboard">
                        <Icon type="pie-chart" />
                        <span>Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="monitoring">
                        <Icon type="desktop" />
                        <span>Monitoring</span>
                    </Menu.Item>
                    <Menu.SubMenu
                        key="alarm"
                        title={
                            <span>
                                <Icon type="user" />
                                <span>Alarm</span>
                            </span>
                        }
                    >
                        <Menu.Item key="alarm-list">Alarm list</Menu.Item>
                        <Menu.Item key="alarm-rule">Alarm Rule</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="flow">
                        <Icon type="team" />
                        <span>Flow</span>
                    </Menu.Item>
                    <Menu.Item key="administrator">
                        <Icon type="file" />
                        <span>Administrator</span>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>
        )
    }
}
export default Sider;
