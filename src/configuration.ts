export interface Theme {
    [key: string]: {
        [key: string]: string;
    };
}

export interface Modules {
    [key: string]: boolean;
}

export interface Configuration {
    theme: Theme;
    modules: Modules;
}

const configuration: Configuration = {
    theme: {
        dark: {
            '@primary-color': '#fff',
        },
    },
    modules: {
        ModuleA: true,
        ModuleB: true,
    },
};

export default configuration;
