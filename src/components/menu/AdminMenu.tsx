import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import sortBy from 'lodash/sortBy';
import { withRouter, RouteComponentProps, Redirect, matchPath } from 'react-router-dom';

import { Sider } from '../layout';
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

class AdminMenu extends Component<IProps, IState> {
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

    getCollapsedMenu = (pathname: string) => {
        const { collapsed } = this.state;
        // if (pathname === '/monitoring') {
        //     return true;
        // } else if (matchPath(pathname, { exact: true, strict: true, path: '/dashboard/:id' })) {
        //     return true;
        // }
        return collapsed;
    }

    buildMenus = (routes: IRoute[]) => {
        const menu = (routes: IRoute[]): IMenu[] => {
            const menus = routes.reduce((prev, curr) => {
                if (!curr.isMenu) {
                    return prev;
                }
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

    handleLink = (path: string) => {
        this.props.history.push(path);
    }

    handleCollapse = (collapsed: boolean) => {
        this.setState({
            collapsed,
        });
    }

    renderTitle = (menu: IMenu) => {
        const { key, title, icon } = menu;
        return (
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
                        onClick={() => this.handleLink(subMenu.key)}
                    >
                        {this.renderTitle(subMenu)}
                    </Menu.Item>
                ));
                return (
                    <Menu.SubMenu
                        key={key}
                        title={this.renderTitle(menu)}
                    >
                        {menus}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item
                    key={key}
                    onClick={() => this.handleLink(menu.key)}
                >
                    {this.renderTitle(menu)}
                </Menu.Item>
            );
        });
    }

    render() {
        const { location } = this.props;
        const { menus } = this.state;
        const { pathname } = location;
        const splitPathname = pathname.split('/');
        const onePath = pathname.split('/').length === 2;
        const onePathname = pathname.split('/')[1];
        let redirectPathname = null;
        if (onePath) {
            menus.some(menu => {
                if (menu.key === `/${onePathname}`) {
                    if (menu.subMenus && menu.subMenus.length) {
                        redirectPathname = menu.subMenus[0].key;
                        return true;
                    }
                }
                return false;
            });
        }
        if (redirectPathname) {
            return <Redirect to={redirectPathname} />
        }
        const isNumber = onePath ? true : isNaN(parseInt(splitPathname[2], 10));
        return (
            <Sider onCollapse={this.handleCollapse} collapsed={this.getCollapsedMenu(pathname)} width={240}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[isNumber ? pathname : `/${onePathname}`]}
                    selectedKeys={[isNumber ? pathname : `/${onePathname}`]}
                    defaultOpenKeys={onePath ? null : [`/${onePathname}`]}
                >
                    {this.renderMenus()}
                </Menu>
            </Sider>
        )
    }
}
export default withRouter(AdminMenu);
