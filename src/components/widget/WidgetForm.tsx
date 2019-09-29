import React, { Component } from 'react';
import { Collapse } from 'antd';

import { Form } from '../form';
import { IWidget, IWidgetProperties } from './Widget';
import { WidgetFormSchema } from '../../utils';

interface IProps<T> {
    widget: T;
    widgetSchema: WidgetFormSchema;
    onChange?: (values: IWidgetProperties) => void;
}

interface IState {
    activeKey?: string | string[];
}

class WidgetForm<T extends IWidget = any> extends Component<IProps<T>, IState> {
    forms: { [key: string]: typeof Form } = {};

    state: IState = {
        activeKey: Object.keys(this.props.widgetSchema)[0],
    }

    handleValuesChange = (allValues: any, formKey: string, isSingle: boolean) => {
        let properties;
        if (isSingle) {
            properties = Object.assign({}, this.props.widget.properties, allValues);
        } else {
            const targetProperty = Object.assign({}, this.props.widget.properties[formKey], allValues);
            properties = Object.assign({}, this.props.widget.properties, { [formKey]: targetProperty });
        }
        const { onChange } = this.props;
        if (onChange) {
            onChange(properties);
        }
    }

    handleChangeActiveKey = (activeKey: string | string[]) => {
        this.setState({
            activeKey,
        });
    }

    render() {
        const { widget, widgetSchema } = this.props;
        const { activeKey } = this.state;
        return (
            <Collapse activeKey={activeKey} onChange={this.handleChangeActiveKey}>
                {
                    Object.keys(widgetSchema).map(key => {
                        const { title, schema, isSingle } = widgetSchema[key];
                        return (
                            <Collapse.Panel key={key} header={title}>
                                <Form
                                    wrappedComponentRef={(c: any) => { this.forms[key] = c; }}
                                    formSchema={schema}
                                    formKey={key}
                                    isSingle={isSingle}
                                    onValuesChange={this.handleValuesChange}
                                    values={widget.properties[key]}
                                />
                            </Collapse.Panel>
                        );
                    })
                }
            </Collapse>
        )
    }
}

export default WidgetForm;
