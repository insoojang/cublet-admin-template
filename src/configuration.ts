export type ThemeType = 'dark' | 'light';

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
            '@text-color': 'fade(#fff, 65%)',
        },
        light: {
            '@primary-color': '#08979c',
            '@body-background': '#fff',
            '@component-background': '#fff',
            '@text-color': 'fade(#000, 65%)',
        },
    },
    modules: {
        ModuleA: true,
        ModuleB: true,
    },
};

export default configuration;
