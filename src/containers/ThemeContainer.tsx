import React, { Component } from 'react';
import { message } from 'antd';

import configuration, { ThemeType } from '../configuration';

export const ThemeContext = React.createContext<{ [key: string]: any }>({
    theme: 'dark',
    // tslint:disable-next-line: no-empty
    onChangeTheme: () => {},
});

interface IState {
    theme: string;
}

class ThemeContainer extends Component<{}, IState> {
    state: IState = {
        theme: 'dark',
    }

    componentDidMount() {
        window.less.modifyVars(configuration.theme.dark).catch((error: any) => {
            message.error('Failed to reset theme');
            console.error(error);
        });
    }

    handleChangeTheme = (theme: ThemeType) => {
        const variable = configuration.theme[theme] || configuration.theme.dark;
        window.less
        .modifyVars(variable)
        .then(() => {
            // message.success(`Theme updated successfully`);
            this.setState({ theme });
            localStorage.setItem('theme', JSON.stringify(variable));
        })
        .catch((error: any) => {
            console.error(error);
            message.error('Failed to update theme');
        });
    }

    render() {
        const { children } = this.props;
        const { theme } = this.state;
        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    onChangeTheme: this.handleChangeTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContainer;
