import { Home } from '../components/home';
import { Monitoring } from '../components/monitoring';
import { Account } from '../components/account';

export interface IRoute {
    path: string;
    component: React.ComponentType;
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
        component: Monitoring,
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
        component: Monitoring,
        isMenu: true,
        icon: 'user',
        routes: [
            {
                path: '/alarm/list',
                component: Monitoring,
                isMenu: true,
                icon: 'user',
            },
            {
                path: '/alarm/rule',
                component: Monitoring,
                isMenu: true,
                icon: 'user',
            },
        ],
    },
    {
        path: '/flow',
        component: Monitoring,
        isMenu: true,
        icon: 'team',
    },
    {
        path: '/administrator',
        component: Monitoring,
        isMenu: true,
        icon: 'file',
    },
    {
        path: '/account',
        component: Account,
    },
];

export default routes;
