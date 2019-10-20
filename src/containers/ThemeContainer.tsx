import React, { Component } from 'react';

export const ThemeContext = React.createContext<{ [key: string]: string }>({});

interface IState {
    theme: { [key: string]: string };
}

class ThemeContainer extends Component<{}, IState> {
    state: IState = {
        theme: {},
    }

    render() {
        const { children } = this.props;
        const { theme } = this.state;
        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeContainer;
