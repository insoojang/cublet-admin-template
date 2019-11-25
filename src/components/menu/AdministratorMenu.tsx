import React, { Component } from 'react';
import { Input, Menu, Icon } from 'antd';
import sortBy from 'lodash/sortBy';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import { IRoute } from '../../routes/routes';

interface IMenu {
    key: string;
    icon?: string;
    title?: string;
    order?: number;
    subMenus?: IMenu[];
}

interface IProps extends RouteComponentProps {
    routes: IRoute[];
}

interface IState {
    menus: IMenu[],
    collapsed: boolean;
}

class AdministratorMenu extends Component<IProps, IState> {
    state: IState = {
        menus: [],
        collapsed: false,
    }

    componentDidMount() {
        const { routes } = this.props;
        this.buildMenus(routes);
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        const { routes } = nextProps;
        this.buildMenus(routes);
    }

    buildMenus = (routes: IRoute[]) => {
        const menu = (routes: IRoute[]): IMenu[] => {
            const menus = routes.reduce((prev, curr) => {
                const obj = {
                    key: curr.path,
                    icon: curr.icon,
                    title: curr.title,
                    order: curr.order,
                    subMenus: curr.subRoutes ? menu(curr.subRoutes) : null,
                };
                prev.push(obj);
                return prev;
            }, []);
            return sortBy(menus, ['order']);
        };
        this.setState({
            menus: menu(routes),
        });
    }

    handleCollapse = (collapsed: boolean) => {
        this.setState({
            collapsed,
        });
    }

    renderTitle = (menu: IMenu, isLink = true) => {
        const { key, title, icon } = menu;
        return isLink ? (
            <Link to={key}>
                {icon && <Icon type={icon} />}
                <span>{title || key}</span>
            </Link>
        ) : (
            <>
                {icon && <Icon type={icon} />}
                <span>{title || key}</span>
            </>
        );
    }

    renderMenus = () => {
        const { menus } = this.state;
        return menus.map(menu => {
            const { key, subMenus } = menu;
            if (subMenus && subMenus.length) {
                const menus = subMenus.map(subMenu => (
                    <Menu.Item
                        key={subMenu.key}
                    >
                        {this.renderTitle(subMenu)}
                    </Menu.Item>
                ));
                return (
                    <Menu.ItemGroup
                        key={key}
                        title={this.renderTitle(menu, false)}
                    >
                        {menus}
                    </Menu.ItemGroup>
                );
            }
            return (
                <Menu.Item
                    key={key}
                >
                    {this.renderTitle(menu)}
                </Menu.Item>
            );
        });
    }

    render() {
        const { location } = this.props;
        return (
            <div className="cublet-admin-menu">
                <div className="cublet-admin-menu-toolbar">
                    <Input.Search placeholder="Search for menu..." />
                </div>
                <Menu
                    defaultSelectedKeys={[location.pathname]}
                    selectedKeys={[location.pathname]}
                >
                    {this.renderMenus()}
                </Menu>
            </div>
        )
    }
}

export default withRouter(AdministratorMenu);
