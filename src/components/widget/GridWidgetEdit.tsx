import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import { Icon, Button } from 'antd';
import i18next from 'i18next';
import faker from 'faker';
import debounce from 'lodash/debounce';

import GridWidget, { IGridWidget } from './GridWidget';
import { Scrollbar } from '../scrollbar';
import WidgetForm from './WidgetForm';
import { FormSchema } from '../form/Form';

export interface GridWidgetEditProps {
    visible?: boolean;
    onClose?: () => void;
    onSave?: (widget: any) => void;
    widget?: IGridWidget;
}

interface IState {
    properties: { [key: string]: FormSchema };
}

const initialWidget = {
    id: faker.random.uuid(),
    title: '',
    description: '',
    type: 'card',
    properties: {},
}

class GridWidgetEdit extends Component<GridWidgetEditProps, IState> {
    formRef: WidgetForm;

    static defaultProps = {
        widget: initialWidget,
    }

    state: IState = {
        properties: initialWidget.properties,
    }

    componentDidMount() {
        if (this.props.visible) {
            this.attachEvents();
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
        const { props } = this.formRef.forms.general as any;
        props.form.validateFields((err: any, values: any) => {
            console.log(err);
            if (err) {
                return;
            }
            console.log(values);
            const { onSave } = this.props;
            if (onSave) {
                onSave({
                    id: faker.random.uuid(),
                    title: faker.random.words(10),
                    type: 'card',
                    properties: values,
                });
                this.setState({
                    properties: {},
                });
            }
        });
    }

    handleChangeValues = debounce((values: { [key: string]: FormSchema }) => {
        this.setState({
            properties: values,
        });
    }, 300, {
        leading: false,
        trailing: true,
    })

    render() {
        const { visible, onClose, widget } = this.props;
        const { properties } = this.state;
        const w = widget || initialWidget;
        return visible && (
            <div className="gyul-widget-grid-edit" style={{ display: visible ? 'flex' : 'none' }}>
                <SplitPane primary="second" minSize={320} maxSize={720} defaultSize={480}>
                    <div className="gyul-widget-grid-edit-setting">
                        <div className="gyul-widget-grid-edit-setting-form">
                            <Scrollbar>
                                <WidgetForm
                                    ref={(c: WidgetForm) => { this.formRef = c; }}
                                    widget={{ ...w, properties, title: properties.general ? properties.general.title as any : '' }}
                                    onChange={this.handleChangeValues}
                                />
                            </Scrollbar>
                        </div>
                        <div className="gyul-widget-grid-edit-setting-action">
                            <Button onClick={this.handleSave}>{i18next.t('common.save')}</Button>
                        </div>
                    </div>
                    <div className="gyul-widget-grid-edit-preview">
                        <div className="gyul-widget-grid-edit-close">
                            <Icon className="gyul-action-icon" type="close" onClick={onClose} />
                        </div>
                        <GridWidget widget={{ ...w, properties, title: properties.general ? properties.general.title as any : '' }} preview={true} />
                    </div>
                </SplitPane>
            </div>
        )
    }
}
export default GridWidgetEdit;
