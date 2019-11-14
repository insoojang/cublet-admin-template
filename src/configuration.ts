export type ThemeType = 'dark' | 'light' | string;

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
            '@primary-color': '#08979c',
            '@body-background': '#38424b',
            '@component-background': '#434f5a',
            '@layout-body-background': '#38424b',
            '@layout-header-background': '#343d45',
            '@text-color': '#e6e6e6',
            '@text-color-secondary-dark': '#e6e6e6',
            '@heading-color': '#bbb',
            '@background-color-light': '#434f5a',
        },
        light: {
            '@primary-color': '#08979c',
            '@body-background': '#fff',
            '@component-background': '#fff',
            '@layout-body-background': '#fff',
            '@layout-header-background': '#fff',
            '@text-color': '#545454',
            '@text-color-secondary-dark': '#545454',
            '@heading-color': '#5b626b',
        },
    },
    modules: {
        ModuleA: true,
        ModuleB: true,
    },
};

export default configuration;
