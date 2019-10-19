import i18next from 'i18next';

import { IRoute } from './routes';
import { DialogExample } from '../examples/dialog';

const extraRoutes: IRoute[] = [
    {
        path: '/components/dialog',
        component: DialogExample,
        icon: 'pie-chart',
        title: i18next.t('examples.dialog'),
    },
];

export default extraRoutes;
