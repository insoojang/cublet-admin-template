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
            analysis: {
                key: 'analysis',
                component: AnalysisPanel,
                title: i18next.t('monitoring.analysis'),
            },
        });
    }
}

export default Module;
