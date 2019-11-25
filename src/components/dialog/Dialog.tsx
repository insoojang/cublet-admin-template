import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Icon } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import i18next from 'i18next';
import classnames from 'classnames';

export interface DialogProps {
    visible?: boolean;
    global?: boolean;
    title?: React.ReactNode;
    footer?: React.ReactNodeArray;
    okText?: string;
    cancelText?: string;
    okProps?: ButtonProps;
    cancelProps?: ButtonProps;
    closeOnDestroy?: boolean;
    closable?: boolean;
    onCancel?: () => void;
    onOk?: () => void;
}

interface IState {
    init: boolean;
}

class Dialog extends Component<DialogProps, IState> {
    private dialogRef: React.RefObject<HTMLDivElement>;
    static defaultProps: DialogProps = {
        visible: false,
        okText: i18next.t('action.ok'),
        cancelText: i18next.t('action.cancel'),
        closable: false,
    }

    constructor(props: DialogProps) {
        super(props);
        this.dialogRef = React.createRef();
    }

    state: IState = {
        init: this.props.visible,
    }

    componentDidMount() {
        this.handleESC();
    }

    UNSAFE_componentWillReceiveProps(nextProps: DialogProps) {
        if (!this.state.init && nextProps.visible) {
            this.setState({
                init: true,
            });
        }
        if (nextProps.visible) {
            this.handleESC();
        }
    }

    handleESC = () => {
        const { closable, onCancel } = this.props;
        if (closable) {
            document.addEventListener('keydown', e => {
                if (e.code === 'Escape') {
                    if (onCancel) {
                        onCancel();
                    }
                }
            }, {
                once: true,
                capture: false,
            });
        }
    }

    isValidateElement = (container: HTMLElement) => {
        return container && container instanceof HTMLElement;
    }

    renderHeader = () => {
        const { title } = this.props;
        return title && (
            <div className="cublet-dialog-header">
                {title}
            </div>
        );
    }

    renderFooter = () => {
        const { footer, okText, cancelText, okProps, cancelProps, onCancel, onOk } = this.props;
        if (footer === null) {
            return null;
        }
        let actions = footer;
        if (typeof footer === 'undefined') {
            actions = [
                <Button key="cancel" {...cancelProps} onClick={onCancel}>{cancelText}</Button>,
                <Button key="ok" type="primary" {...okProps} onClick={onOk}>{okText}</Button>,
            ];
        }
        return (
            <div className="cublet-dialog-footer">
                {actions}
            </div>
        );
    }

    renderClosable = () => {
        const { closable, onCancel } = this.props;
        return closable && (
            <Icon className="cublet-dialog-close cublet-action-icon" type="close" onClick={onCancel} />
        );
    }

    renderDialog = () => {
        const { children, closeOnDestroy, visible } = this.props;
        const { init } = this.state;
        if (closeOnDestroy && !visible) {
            return null;
        }
        if (!init) {
            return null;
        }
        return (
            <div ref={this.dialogRef} className="cublet-dialog-container">
                {this.renderHeader()}
                {this.renderClosable()}
                <div className="cublet-dialog-content">
                    {children}
                </div>
                {this.renderFooter()}
            </div>
        );
    }

    render() {
        const { global, visible } = this.props;
        const className = classnames('cublet-dialog', {
            visible,
            global,
        });
        const component = (
            <div className={className}>
                {this.renderDialog()}
            </div>
        );
        if (global) {
            return ReactDOM.createPortal(component, document.body);
        }
        return component;
    }
}

export default Dialog;
