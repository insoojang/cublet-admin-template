import React, { Component } from 'react';

import configuration from '../configuration';
import AppModule, { ModuleConfigurations } from '../modules/AppModule';

export const ModuleContext = React.createContext<ModuleConfigurations>({});

interface IState {
    configurations: ModuleConfigurations;
}

class ModuleContainer extends Component<{}, IState> {
    private appModule: AppModule;

    state: IState = {
        configurations: {},
    }

    componentDidMount() {
        this.appModule = new AppModule();
        this.moduleLoader();
    }

    private moduleLoader = async () => {
        this.appModule.dashboardWidgets();
        this.appModule.resourceDetails();
        this.appModule.resourceSummaryDetails();
        await this.appModule.reducers();
        await this.appModule.routes();
        const modules = Object.keys(configuration.modules)
        .filter(moduleKey => configuration.modules[moduleKey])
        .map(moduleKey => import(`../modules/${moduleKey}/Module`))
        .map(moduleFile => moduleFile.then(async m => {
            const subModule = new m.default(this.appModule.configurations) as AppModule;
            subModule.dashboardWidgets();
            subModule.resourceDetails();
            subModule.resourceSummaryDetails();
            await subModule.reducers();
            await subModule.routes();
            return subModule;
        }));
        try {
            Promise.all(modules);
            this.setState({
                configurations: this.appModule.configurations,
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
