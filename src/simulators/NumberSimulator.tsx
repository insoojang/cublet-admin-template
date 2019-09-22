import React from 'react';

interface IState {
    randomValue?: number;
}

const NumberSimulator = (interval: number = 1000, value?: number) => (WrappedComponent: React.ComponentClass<any, any>) => {
    return class NumberSimulator extends WrappedComponent {
        intervalId: NodeJS.Timeout;

        state: IState = {
            randomValue: null,
        }

        componentDidMount() {
            this.intervalId = setInterval(() => {
                this.setState({
                    randomValue: typeof value === 'undefined' ? (Math.random() * 50) + 50 : value,
                });
            }, interval);
        }

        componentWillUnmount() {
            clearInterval(this.intervalId);
        }

        render() {
            const {
                ...other
            } = this.props;
            const { randomValue } = this.state;
            return <WrappedComponent {...other} randomValue={randomValue} />;
        }
    }
}

export default NumberSimulator;
