import React, { Component } from 'react';

import configuration, { ThemeType } from '../configuration';

export const ThemeContext = React.createContext<{ [key: string]: any }>({
    theme: 'dark',
    // tslint:disable-next-line: no-empty
    changeTheme: () => {},
});

interface IProps {
    theme?: ThemeType;
}

interface IState {
    theme: string;
}

class ThemeContainer extends Component<IProps, IState> {
    static defaultProps: IProps = {
        theme: 'dark',
    }

    state: IState = {
        theme: 'dark',
    }

    componentDidMount() {
        this.handleChangeTheme(this.props.theme);
    }

    shouldComponentUpdate(nextProps: IProps) {
        if (nextProps.theme !== this.props.theme) {
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.handleChangeTheme(this.props.theme);
    }

    handleChangeTheme = (theme: ThemeType) => {
        const variable = configuration.theme[theme];
        if (window.less && variable) {
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
