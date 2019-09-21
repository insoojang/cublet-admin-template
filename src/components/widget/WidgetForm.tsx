import React, { Component } from 'react';
import { Collapse } from 'antd';

import { Form } from '../form';
import { FormSchema } from '../form/Form';
import GridWidgetSchema, { WidgetFormSchema } from './schema/grid';
import { IGridWidget } from './GridWidget';

interface IProps {
    widget: IGridWidget;
    onChange?: (values: { [key: string]: FormSchema }) => void;
}

interface IState {
    properties: WidgetFormSchema;
}

class WidgetForm extends Component<IProps, IState> {
    forms: { [key: string]: typeof Form } = {};

    handleGeneralChange = (type: string, props: any, changedValues: any, allValues: any) => {
        const targetProperty = Object.assign({}, this.props.widget.properties[type], allValues);
        const properties = Object.assign({}, this.props.widget.properties, { [type]: targetProperty });
        const { onChange } = this.props;
        if (onChange) {
            onChange(properties);
        }
    }

    render() {
        const { widget } = this.props;
        const widgetSchema = GridWidgetSchema[widget.type];
        return (
            <Collapse defaultActiveKey={Object.keys(widgetSchema)}>
                {
                    Object.keys(widgetSchema).map(key => {
                        const { title, schema } = widgetSchema[key];
                        return (
                            <Collapse.Panel key={key} header={title}>
                                <Form
                                    wrappedComponentRef={(c: any) => { this.forms[key] = c; }}
                                    formSchema={schema}
                                    onValuesChange={this.handleGeneralChange.bind(this, key)}
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
