import React, { Component } from 'react';
import { message } from 'antd';
import { RouteComponentProps } from 'react-router';
import drop from 'lodash/drop';

import { GridDashboard } from '.';
import { DashboardDatabase } from '../../databases';
import { IWidget } from '../widget/Widget';

export type DashboardType = 'grid' | 'free';

export interface DashboardProps {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    type: DashboardType;
    widgets?: IWidget[];
}

interface IState {
    dashboard?: DashboardProps;
    widgets?: IWidget[];
}

class Dashboard extends Component<RouteComponentProps, IState> {
    state: IState = {
        dashboard: null,
        widgets: [],
    }

    componentDidMount() {
        const dashboardId = drop(this.props.location.pathname.split('/'))[1];
        this.getDashboard(dashboardId);
    }

    getDashboard = async (dashboardId: string) => {
        try {
            const response = await DashboardDatabase.getById(dashboardId);
            const { _id: id, title, description, thumbnail, type, widgets = [] } = response as any;
            const dashboard = {
                id,
                title,
                description,
                thumbnail,
                type,
            };
            this.setState({
                dashboard,
                widgets,
            });
        } catch (error) {
            message.warn(`${error}`);
        }
    }

    render() {
        const { dashboard, widgets } = this.state;
        return <GridDashboard dashboard={dashboard} widgets={widgets} />
    }
}
export default Dashboard;
