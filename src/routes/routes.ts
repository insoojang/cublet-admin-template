import i18next from 'i18next';

import { Monitoring } from '../components/monitoring';
import { Account } from '../components/account';
import { AlarmList, AlarmRuleList, Alarms } from '../components/alarm';
import { FlowList, FlowEditor } from '../components/flow';
import { DashboardList, Dashboard } from '../components/dashboard';
import { Administrator, SystemInfo, SMSNotification, EmailNotification, WhiteLabeling } from '../components/administrator';
import { AnalysisList, AnalysisEditor } from '../components/analysis';
import { UserList } from '../components/user';
import { RoleList } from '../components/role';

export interface IRoute {
    path: string;
    /**
     * Main component
     */
    component?: React.ComponentType<any>;
    /**
     * Sub component
     */
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
        subRoutes: [
            {
                path: '/analysis/:id',
                component: AnalysisEditor,
            },
        ],
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
                    {
                        path: '/administrator/system-setting/white-labeling',
                        icon: 'tool',
                        component: Administrator,
                        subComponent: WhiteLabeling,
                        title: i18next.t('administrator.white-labeling'),
                    },
                ],
            },
            {
                path: '/administrator/acl',
                component: Administrator,
                title: i18next.t('administrator.acl'),
                subRoutes: [
                    {
                        path: '/administrator/acl/user',
                        icon: 'user',
                        component: Administrator,
                        subComponent: UserList,
                        title: i18next.t('administrator.user'),
                    },
                    {
                        path: '/administrator/acl/role',
                        icon: 'user',
                        component: Administrator,
                        subComponent: RoleList,
                        title: i18next.t('administrator.role'),
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
