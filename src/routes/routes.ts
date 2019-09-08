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
    },
    {
        path: '/dashboard',
        component: DashboardList,
        isMenu: true,
        icon: 'pie-chart',
    },
    {
        path: '/monitoring',
        component: Monitoring,
        isMenu: true,
        icon: 'desktop',
    },
    {
        path: '/alarm',
        isMenu: true,
        icon: 'user',
        routes: [
            {
                path: '/alarm/list',
                component: AlarmList,
                isMenu: true,
                icon: 'user',
            },
            {
                path: '/alarm/rule',
                component: AlarmRuleList,
                isMenu: true,
                icon: 'user',
            },
        ],
    },
    {
        path: '/flow',
        component: FlowList,
        isMenu: true,
        icon: 'team',
    },
    {
        path: '/administrator',
        isMenu: true,
        icon: 'file',
        routes: [
            {
                path: '/administrator/system-setting',
                isMenu: true,
                icon: 'tool',
                component: SystemSetting,
            },
        ],
    },
    {
        path: '/account',
        component: Account,
    },
];

export default routes;
