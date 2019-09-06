import React from 'react';
import { Layout } from 'antd';
import { SiderProps } from 'antd/lib/layout/Sider';

interface IProps extends SiderProps {
    content?: React.ReactNode;
    logo?: HTMLImageElement;
}

const Sider: React.SFC<IProps> = (props) => {
    const {
        content,
        children,
        collapsible = true,
        ...other
    } = props;
    return (
        <Layout.Sider collapsible={collapsible} {...other}>
            <div className="gyul-menu-logo" />
            {content || children}
        </Layout.Sider>
    )
}

export default Sider;
