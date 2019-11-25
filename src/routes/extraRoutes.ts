import i18next from 'i18next';

import { IRoute } from './routes';
import { DialogExample } from '../examples/dialog';
import { Login } from '../components/login';

const extraRoutes: IRoute[] = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/components/dialog',
        component: DialogExample,
        icon: 'pie-chart',
        title: i18next.t('examples.dialog'),
    },
];

export default extraRoutes;
