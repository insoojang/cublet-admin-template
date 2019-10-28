import AppModule, { ModuleConfigurations } from '../AppModule';
import AnalysisPanel from './panel/AnalysisPanel';
import i18next from 'i18next';

class Module extends AppModule {
    constructor(configurations: ModuleConfigurations) {
        super();
        this.configurations = configurations;
    }

    resourceDetails() {
        this.registerResourceDetails({
            analysis2: {
                key: 'analysis',
                component: AnalysisPanel,
                title: i18next.t('monitoring.analysis'),
            },
        });
    }

    theme() {
        this.registerTheme({
            green: {
                '@body-background': 'green',
                '@component-background': 'green',
                '@text-color': 'green',
            },
        });
    }
}

export default Module;
