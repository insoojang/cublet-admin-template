import React, { Component } from 'react';

import { ThemeType, Theme } from '../configuration';

export const ThemeContext = React.createContext<{ [key: string]: any }>({
    theme: 'dark',
    // tslint:disable-next-line: no-empty
    changeTheme: () => {},
});

interface IProps {
    defaultTheme?: ThemeType;
    theme?: Theme;
}

interface IState {
    theme: string;
}

class ThemeContainer extends Component<IProps, IState> {
    state: IState = {
        theme: 'dark',
    }

    componentDidMount() {
        this.handleChangeTheme(this.props.defaultTheme);
    }

    shouldComponentUpdate(nextProps: IProps) {
        if (nextProps.defaultTheme !== this.props.defaultTheme
        || nextProps.theme !== this.props.theme) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.handleChangeTheme(this.props.defaultTheme);
    }

    handleChangeTheme = (theme: ThemeType) => {
        const variable = this.props.theme[theme];
        if (variable) {
            window.less
            .modifyVars(variable)
            .then(() => {
                this.setState({ theme });
                localStorage.setItem('theme', theme);
            })
            .catch((error: any) => {
                console.error(error);
            });
        }
    }

    render() {
        const { children } = this.props;
        const { theme } = this.state;
        return (
            <ThemeContext.Provider
                value={{
                    theme,
                    changeTheme: this.handleChangeTheme,
                }}
            >
                {children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContainer;
