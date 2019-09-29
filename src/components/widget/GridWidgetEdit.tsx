import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { Icon, Button } from 'antd';
import i18next from 'i18next';
import debounce from 'lodash/debounce';

import GridWidget, { IGridWidget } from './GridWidget';
import { Scrollbar } from '../scrollbar';
import WidgetForm from './WidgetForm';
import { IWidgetProperties } from './Widget';
import GridWidgetSchema from './schema/grid';
import { MultipleFormConfig } from '../form/Form';

interface IProps {
    visible?: boolean;
    onClose?: () => void;
    onSave?: (widget: any) => void;
    widget?: IGridWidget;
}

interface IState {
    properties: IWidgetProperties;
}

class GridWidgetEdit extends Component<IProps, IState> {
    formRef: WidgetForm;

    state: IState = {
        properties: {},
    }

    componentDidMount() {
        if (this.props.visible) {
            this.attachEvents();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        if ((nextProps.widget && nextProps.widget.id) !== (this.props.widget && this.props.widget.id)) {
            this.setState({
                properties: {},
            });
        }
    }

    componentDidUpdate() {
        if (this.props.visible) {
            this.attachEvents();
        } else {
            this.detachEvents();
        }
    }

    attachEvents = () => {
        document.addEventListener('keydown', this.handleESC);
    }

    detachEvents = () => {
        document.removeEventListener('keydown', this.handleESC);
    }

    handleESC = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            const { onClose } = this.props;
            if (onClose) {
                onClose();
            }
        }
    }

    handleSave = async () => {
        const { forms } = this.formRef;
        const promises = Object.keys(forms).map(key => {
            const { props } = forms[key] as any;
            const { isSingle } = props;
            return new Promise((resolve, reject) => {
                props.form.validateFields((err: any, values: any) => {
                    if (err) {
                        reject({
                            [key]: err,
                        });
                    } else {
                        if (isSingle) {
                            resolve(values);
                        } else {
                            resolve({
                                [key]: values,
                            });
                        }
                    }
                });
            })
        });
        Promise.all(promises)
        .then((result: any[]) => {
            const values = result.reduce((prev, curr) => Object.assign(prev, curr), {});
            const { onSave, widget } = this.props;
            if (onSave) {
                this.setState({
                    properties: {},
                }, () => {
                    onSave({
                        ...widget,
                        title: values.general.title,
                        description: values.general.description,
                        properties: Object.assign({}, widget.properties, values),
                    });
                });
            }
        })
        .catch((error: any) => {
            console.warn(error);
        });
    }

    handleChangeValues = debounce((values: IWidgetProperties) => {
        this.setState({
            properties: values,
        });
    }, 300, {
        leading: false,
        trailing: true,
    })

    render() {
        const { visible, onClose, widget } = this.props;
        if (widget) {
            const properties = Object.assign({}, widget.properties, this.state.properties);
            const general = properties.general as MultipleFormConfig;
            const title = general ? general.title as string : '';
            return visible && (
                <div className="gyul-widget-grid-edit" style={{ display: visible ? 'flex' : 'none' }}>
                    <SplitPane primary="second" minSize={320} maxSize={720} defaultSize={'50%'}>
                        <div className="gyul-widget-grid-edit-setting">
                            <div className="gyul-widget-grid-edit-setting-form">
                                <Scrollbar>
                                    <WidgetForm
                                        ref={(c: WidgetForm) => { this.formRef = c; }}
                                        widget={{ ...widget, properties, title }}
                                        widgetSchema={GridWidgetSchema[widget.type]}
                                        onChange={this.handleChangeValues}
                                    />
                                </Scrollbar>
                            </div>
                            <div className="gyul-widget-grid-edit-setting-action">
                                <Button onClick={this.handleSave} type="primary">{i18next.t('action.save')}</Button>
                                <Button onClick={onClose}>{i18next.t('action.cancel')}</Button>
                            </div>
                        </div>
                        <div className="gyul-widget-grid-edit-preview">
                            <div className="gyul-widget-grid-edit-close">
                                <Icon className="gyul-action-icon" type="close" onClick={onClose} />
                            </div>
                            <GridWidget widget={{ ...widget, properties, title }} preview={true} />
                        </div>
                    </SplitPane>
                </div>
            );
        }
        return null;
    }
}
export default GridWidgetEdit;
