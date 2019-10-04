import i18next from 'i18next';

import { Monitoring } from '../components/monitoring';
import { Account } from '../components/account';
import { AlarmList, AlarmRuleList, Alarms } from '../components/alarm';
import { FlowList, FlowEditor } from '../components/flow';
import { DashboardList, Dashboard } from '../components/dashboard';
import { Administrator, SystemInfo, SMSNotification, EmailNotification } from '../components/administrator';
import { AnalysisList } from '../components/analysis';

export interface IRoute {
    path: string;
    component?: React.ComponentType<any>;
    subComponent?: React.ComponentType<any>;
    subRoutes?: IRoute[];
    exact?: boolean;
    strict?: boolean;
    icon?: string;
    title?: string;
    order?: number;
    isMenu?: boolean;
}

const routes: IRoute[] = [
    {
        path: '/dashboard',
        component: DashboardList,
        isMenu: true,
        icon: 'pie-chart',
        title: i18next.t('dashboard.dashboard'),
        subRoutes: [
            {
                path: '/dashboard/:id',
                component: Dashboard,
            },
        ],
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
        component: Alarms,
        subRoutes: [
            {
                path: '/alarm/list',
                component: AlarmList,
                icon: 'user',
                title: i18next.t('alarm.list'),
            },
            {
                path: '/alarm/rule',
                component: AlarmRuleList,
                icon: 'user',
                title: i18next.t('alarm.rule'),
            },
        ],
    },
    {
        path: '/flow',
        component: FlowList,
        isMenu: true,
        icon: 'team',
        title: i18next.t('flow.flow'),
        subRoutes: [
            {
                path: '/flow/:id',
                component: FlowEditor,
            },
        ],
    },
    {
        path: '/analysis',
        component: AnalysisList,
        isMenu: true,
        icon: 'dot-chart',
        title: i18next.t('analysis.analysis'),
    },
    {
        path: '/administrator',
        isMenu: true,
        icon: 'file',
        title: i18next.t('administrator.administrator'),
        component: Administrator,
        subRoutes: [
            {
                path: '/administrator/system-setting',
                component: Administrator,
                title: i18next.t('administrator.system-setting'),
                subRoutes: [
                    {
                        path: '/administrator/system-setting/system-info',
                        icon: 'tool',
                        component: Administrator,
                        subComponent: SystemInfo,
                        title: i18next.t('administrator.system-info'),
                    },
                    {
                        path: '/administrator/system-setting/sms-notification',
                        icon: 'tool',
                        component: Administrator,
                        subComponent: SMSNotification,
                        title: i18next.t('administrator.sms-notification'),
                    },
                    {
                        path: '/administrator/system-setting/email-notification',
                        icon: 'tool',
                        component: Administrator,
                        subComponent: EmailNotification,
                        title: i18next.t('administrator.email-notification'),
                    },
                ],
            },
        ],
    },
    {
        path: '/account',
        component: Account,
    },
];

export default routes;
