import React, { Component } from 'react';
import { Button } from 'antd';
import { ButtonSize, ButtonType } from 'antd/lib/button';
import classnames from 'classnames';

import DialButton from './DialButton';

export type DialPosition = 'left' | 'right' | 'top' | 'bottom';

export interface DialProps {
    icon?: string;
    cancelIcon?: string;
    size?: ButtonSize;
    type?: ButtonType;
    action?: React.ReactNode;
    position?: DialPosition;
    style?: React.CSSProperties;
    className?: string;
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

    handleVisible = () => {
        const callback = () => {
            this.setState({
                visible: false,
            });
            document.removeEventListener('click', callback);
        };
        if (!this.state.visible) {
            document.addEventListener('click', callback);
        }
        this.setState({
            visible: !this.state.visible,
        });
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
