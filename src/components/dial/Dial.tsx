import React, { Component } from 'react';
import { Button } from 'antd';
import { ButtonSize, ButtonType, ButtonProps } from 'antd/lib/button';
import classnames from 'classnames';

import DialButton from './DialButton';

export type DialPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DialProps extends ButtonProps {
    icon?: string;
    cancelIcon?: string;
    size?: ButtonSize;
    type?: ButtonType;
    action?: React.ReactNode;
    position?: DialPosition;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    /**
     * TODO...
     */
    visible?: boolean;
}

interface IState {
    visible?: boolean;
}

class Dial extends Component<DialProps, IState> {
    static Button: typeof DialButton;

    static defaultProps: DialProps = {
        size: 'large',
        icon: 'plus',
        cancelIcon: 'close',
        type: 'primary',
        position: 'top',
    }

    state: IState = {
        visible: false,
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick);
    }

    handleVisible = () => {
        if (!this.state.visible) {
            document.addEventListener('click', this.handleClick);
        }
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleClick = () => {
        this.setState({
            visible: false,
        });
        document.removeEventListener('click', this.handleClick);
    }

    render() {
        const {
            icon,
            cancelIcon,
            size,
            type,
            action,
            position,
            className,
            style,
            children,
            ...other
        } = this.props;
        const { visible } = this.state;
        const actionClassName = classnames(className, 'gyul-dial-action', {
            visible,
            left: visible && position === 'left',
            right: visible && position === 'right',
            top: visible && position === 'top',
            bottom: visible && position === 'bottom',
        });
        return (
            <div style={style} className="gyul-dial">
                <Button
                    {...other}
                    shape="circle"
                    type={type}
                    size={size}
                    icon={visible ? cancelIcon : icon}
                    onClick={this.handleVisible}
                />
                <div className={actionClassName}>
                    {children || action}
                </div>
            </div>
        )
    }
}

Dial.Button = DialButton;

export default Dial;
