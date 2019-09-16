import i18next from 'i18next';

import { Home } from '../components/home';
import { Monitoring } from '../components/monitoring';
import { Account } from '../components/account';
import { AlarmList, AlarmRuleList } from '../components/alarm';
import { FlowList } from '../components/flow';
import { DashboardList } from '../components/dashboard';
import { SystemSetting } from '../components/administrator';

export interface IRoute {
    path: string;
    component?: React.ComponentType;
    routes?: IRoute[];
    exact?: boolean;
    strict?: boolean;
    icon?: string;
    title?: string;
    order?: number;
    isMenu?: boolean;
}

const routes: IRoute[] = [
    {
        path: '/',
        component: Home,
        isMenu: true,
        icon: 'home',
        title: i18next.t('common.home'),
    },
    {
        path: '/dashboard',
        component: DashboardList,
        isMenu: true,
        icon: 'pie-chart',
        title: i18next.t('dashboard.dashboard'),
    },
    {
        path: '/monitoring',
        component: Monitoring,
        isMenu: true,
        icon: 'desktop',
        title: i18next.t('monitoring.monitoring'),
    },
    {
        path: '/alarm',
        isMenu: true,
        icon: 'user',
        title: i18next.t('alarm.alarm'),
        routes: [
            {
                path: '/alarm/list',
                component: AlarmList,
                isMenu: true,
                icon: 'user',
                title: i18next.t('alarm.alarm-list'),
            },
            {
                path: '/alarm/rule',
                component: AlarmRuleList,
                isMenu: true,
                icon: 'user',
                title: i18next.t('alarm.alarm-rule'),
            },
        ],
    },
    {
        path: '/flow',
        component: FlowList,
        isMenu: true,
        icon: 'team',
        title: i18next.t('flow.flow'),
    },
    {
        path: '/administrator',
        isMenu: true,
        icon: 'file',
        title: i18next.t('administrator.administrator'),
        routes: [
            {
                path: '/administrator/system-setting',
                isMenu: true,
                icon: 'tool',
                component: SystemSetting,
                title: i18next.t('administrator.system-setting'),
            },
        ],
    },
    {
        path: '/account',
        component: Account,
    },
];

export default routes;
