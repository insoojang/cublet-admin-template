import merge from 'lodash/merge';
import i18next from 'i18next';

import { IRoute } from '../routes/routes';
import { OverviewPanel, MetricPanel, SettingPanel } from '../components/monitoring/panel';
import configuration, { Theme, ThemeType } from '../configuration';

export interface ModuleConfigurations {
    dashboardWidgets?: { [key: string]: any };
    resourceDetails?: ResourceDetails;
    resourceSummaryDetails?: ResourceDetails;
    routes?: IRoute[];
    reducers?: { [key: string]: any };
    /**
     * Theme
     */
    theme?: Theme;
    /**
     * Fixed theme
     */
    defaultTheme?: ThemeType;
}

export type ModuleType = 'dashboardWidgets' | 'resourceDetails' | 'resourceSummaryDetails' | 'routes' | 'reducers' | 'theme';

export interface ResourceDetail {
    key: string;
    component: React.ReactNode;
    order?: number;
    title?: () => string | string;
    isView?: () => boolean | boolean;
    grid?: ReactGridLayout.Layout;
}

export interface ResourceDetails {
    [key: string]: ResourceDetail;
}

class AppModule {
    configurations: ModuleConfigurations;

    constructor() {
        this.configurations = {};
    }

    dashboardWidgets() {

    }

    resourceDetails() {
        this.registerResourceDetails({
            overview: {
                key: 'overview',
                component: OverviewPanel,
                title: i18next.t('monitoring.overview'),
            },
            metric: {
                key: 'metric',
                component: MetricPanel,
                title: i18next.t('monitoring.metric'),
            },
            setting: {
                key: 'setting',
                component: SettingPanel,
                title: i18next.t('monitoring.setting'),
            },
        });
    }

    resourceSummaryDetails() {
        this.configurations.resourceSummaryDetails = {
            overview: {
                key: 'overview',
                component: OverviewPanel,
                title: i18next.t('monitoring.overview'),
            },
            metric: {
                key: 'metric',
                component: MetricPanel,
                title: i18next.t('monitoring.metric'),
            },
            setting: {
                key: 'setting',
                component: SettingPanel,
                title: i18next.t('monitoring.setting'),
            },
        };
    }

    routes() {
        const routes = () => import('../routes/routes');
        return routes().then(values => {
            this.configurations.routes = values.default;
            return this.configurations.routes;
        });
    }

    reducers() {
        const reducers = () => import('../reducers');
        return reducers().then(values => {
            this.configurations.reducers = values.default;
            return this.configurations.reducers;
        });
    }

    theme() {
        this.configurations.theme = Object.assign({}, configuration.theme);
    }

    register(moduleType: ModuleType, configuration: IRoute[] | ResourceDetails | any) {
        if (moduleType === 'reducers') {
            return configuration().then((values: any) => {
                const newConfigurations = Object.assign({}, this.configurations.reducers, values);
                Object.assign(this.configurations, { reducers: newConfigurations });
                return this;
            });
        } else if (moduleType === 'routes') {
            const mergedRoutes = (routes: IRoute[], route: IRoute) => {
                const rs = routes || this.configurations.routes;
                const findIndex = rs.findIndex(r => r.path === route.path);
                if (findIndex > -1) {
                    if (route.subRoutes) {
                        route.subRoutes.forEach((r) => {
                            const subRs = mergedRoutes(rs[findIndex].subRoutes, r);
                            Object.assign(route, { routes: subRs });
                        });
                    }
                    Object.assign(rs[findIndex], route);
                } else {
                    rs.push(route);
                }
                return rs;
            };
            configuration.forEach((route: IRoute) => {
                mergedRoutes(this.configurations.routes, route);
            });
            return this;
        }
        const newConfigurations = merge({}, this.configurations[moduleType], configuration);
        Object.assign(this.configurations, { [moduleType]: newConfigurations });
        return this;
    }

    registerResourceDetails(configuration: ResourceDetails) {
        this.register('resourceDetails', configuration);
    }

    registerResourceSummaryDetails(configuration: ResourceDetails) {
        this.register('resourceSummaryDetails', configuration);
    }

    registerTheme(theme: Theme) {
        this.register('theme', theme);
    }
}

export default AppModule;
