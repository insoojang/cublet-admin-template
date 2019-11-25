import React, { Component } from 'react';

import AppModule, { ModuleConfigurations } from '../modules/AppModule';
import configuration from '../configuration';

export const ModuleContext = React.createContext<ModuleConfigurations>({});

interface IState {
    configurations: ModuleConfigurations;
}

class ModuleContainer extends Component<{}, IState> {
    constructor(props: {}) {
        super(props);
    }

    state: IState = {
        configurations: {},
    }

    componentDidMount() {
        this.moduleLoader();
    }

    moduleLoader = async () => {
        const appModule = new AppModule();
        try {
            appModule.dashboardWidgets();
            appModule.resourceDetails();
            appModule.resourceSummaryDetails();
            appModule.reducers();
            appModule.routes();
            const modules = Object.keys(configuration.modules)
            .filter(moduleKey => configuration.modules[moduleKey])
            .map(moduleKey => import(`../modules/${moduleKey}/Module`))
            .map(moduleFile => moduleFile.then(m => {
                const subModule = new m.default(appModule.configurations) as AppModule;
                subModule.dashboardWidgets();
                subModule.resourceDetails();
                subModule.resourceSummaryDetails();
                subModule.reducers();
                subModule.routes();
                return subModule;
            }));
            await Promise.all(modules);
            this.setState({
                configurations: appModule.configurations,
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { children } = this.props;
        const { configurations } = this.state;
        return (
            <ModuleContext.Provider value={configurations}>
                {children}
            </ModuleContext.Provider>
        );
    }
}

export default ModuleContainer;
