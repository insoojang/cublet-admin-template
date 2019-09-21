import React, { Component } from 'react';
import {
    Form as AntForm,
    Row,
    Divider,
    Input,
    InputNumber,
    Switch,
    Select,
    Tooltip,
    Col,
    Icon,
} from 'antd';
import { FormProps as AntFormProps, ValidationRule } from 'antd/lib/form';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import i18next from 'i18next';

export type FormComponentType = 'divider'
| 'label'
| 'text'
| 'textarea'
| 'number'
| 'boolean'
| 'select'
| 'template'
| 'templatearea'
| 'json'
| 'cron'
| 'tags'
| 'dynamic'
| 'custom'
| 'password'
;

export interface FormSchema {
    [key: string]: FormConfig;
}

export interface FormSelectItemConfig {
    label: string;
    value: string | number;
    forms?: FormSchema;
}

export interface FormConfig {
    disabled?: boolean;
    icon?: string;
    extra?: React.ReactNode;
    help?: React.ReactNode;
    description?: React.ReactNode;
    span?: number;
    max?: number;
    min?: number;
    placeholder?: string;
    valuePropName?: string;
    required?: boolean;
    initialValue?: any;
    label?: React.ReactNode;
    items?: FormSelectItemConfig[];
    type?: FormComponentType;
    rules?: ValidationRule[];
    render?: (form: WrappedFormUtils, values: any, disabled: boolean, validate: (errors: any) => void) => React.ReactNode;
    hasFeedback?: boolean;
    component?: React.ComponentClass<any>;
}

export interface FormProps extends AntFormProps {
    wrappedComponentRef?: any;
    gutter?: number;
    values?: object;
    formSchema?: FormSchema;
    form: WrappedFormUtils;
    children?: (form?: WrappedFormUtils) => React.ReactNode | React.ReactNode;
    onValuesChange?: (props: any, changedValues: any, allValues: any) => void;
}

interface IState {
    errors: any;
    selectedValues: any;
}

class Form extends Component<FormProps, IState> {
    static Item: typeof AntForm.Item;

    state: IState = {
        errors: null,
        selectedValues: {},
    }

    getForm = (key: string, formConfig: FormConfig, values: any, form: WrappedFormUtils) => {
        let component = null;
        const {
            disabled,
            icon,
            extra,
            help,
            description,
            span,
            max,
            min,
            placeholder,
            valuePropName,
            items,
            required,
            rules,
            initialValue,
            label,
            type,
            render,
            hasFeedback,
        } = formConfig;
        let value = values[key] || initialValue;
        let newRules = required ? [
            { required: true, message: i18next.t('common.enter-arg', { arg: label }) },
        ] : [] as ValidationRule[];
        if (rules) {
            newRules = newRules.concat(rules);
        }
        let selectFormItems = null;
        switch (type) {
            case 'divider':
                component = <Divider key={key}>{label}</Divider>;
                return component;
            case 'label':
                component = (
                    <span style={{ fontWeight: 'bold' }}>
                        {initialValue}
                    </span>
                );
                break;
            case 'text':
                component = <Input disabled={disabled} minLength={min} maxLength={max} placeholder={placeholder} />;
                break;
            case 'password':
                component = <Input type="password" disabled={disabled} minLength={min} maxLength={max} placeholder={placeholder} />;
                break;
            case 'textarea':
                component = <Input.TextArea disabled={disabled} placeholder={placeholder} />;
                break;
            case 'number':
                component = <InputNumber style={{ width: '100%' }} disabled={disabled} min={min} max={max} />;
                value = values[key];
                break;
            case 'boolean':
                component = <Switch disabled={disabled} />;
                break;
            case 'select':
                value = this.state.selectedValues[key] || values[key] || initialValue;
                component = (
                    <Select placeholder={placeholder} disabled={disabled} onSelect={selectedValue => this.handlers.onSelect(selectedValue, key)}>
                        {
                            Array.isArray(items) && items.map((item: any) => {
                                if (item.forms && item.value === value) {
                                    selectFormItems = Object.keys(item.forms).map(formKey =>
                                        this.getForm(formKey, item.forms[formKey], values, form));
                                }
                                return (
                                    <Select.Option key={item.value} value={item.value}>
                                        {item.label}
                                    </Select.Option>
                                );
                            })
                        }
                    </Select>
                );
                break;
            case 'tags':
                component = (
                    <Select
                        mode="tags"
                        dropdownStyle={{ display: 'none' }}
                        placeholder={placeholder}
                        disabled={disabled}
                    >
                        {
                            value.map((item: any) => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))
                        }
                    </Select>
                );
                break;
            case 'custom':
                component = render ? render(form, values, disabled, this.validators.validate) : (
                    <formConfig.component
                        onValidate={this.validators.validate}
                        form={form}
                        values={values}
                        disabled={disabled}
                    />
                );
                break;
            default:
                component = <Input minLength={min} maxLength={max} placeholder={placeholder} disabled={disabled} />;
        }
        const newLabel = description ? (
            <>
                {icon ? <Icon type={icon} /> : null}
                <span>{label}</span>
                <Tooltip title={description} placement="topRight">
                    <span style={{ float: 'right', marginLeft: 280 }}>
                        <Icon type="question-circle" />
                    </span>
                </Tooltip>
            </>
        ) : (
            <>
                {icon ? <Icon type={icon} /> : null}
                <span>{label}</span>
            </>
        );
        return (
            <React.Fragment key={key}>
                <Col md={24} lg={span || 24}>
                    <AntForm.Item
                        label={label ? newLabel : null}
                        help={help}
                        extra={extra}
                        hasFeedback={hasFeedback}
                    >
                        {
                            form.getFieldDecorator(key, {
                                initialValue: value,
                                rules: newRules,
                                valuePropName: typeof value === 'boolean' ? 'checked' : valuePropName || 'value',
                            })(component)
                        }
                    </AntForm.Item>
                </Col>
                {selectFormItems}
            </React.Fragment>
        );
    }

    handlers = {
        onSelect: (selectedValue: any, key: any) => {
            const { selectedValues } = this.state;
            this.setState({
                selectedValues: Object.assign({}, selectedValues, { [key]: selectedValue }),
            });
        },
    }

    validators = {
        validate: (errors: any) => {
            this.setState({
                errors,
            });
        },
        aceEditorValidator: (rule: any, value: any, callback: any) => {
            if (this.state.errors && this.state.errors.length) {
                callback(this.state.errors);
                return;
            }
            callback();
        },
        cronValidator: (rule: any, value: any, callback: any) => {
            if (this.state.errors && this.state.errors.length) {
                callback(this.state.errors);
                return;
            }
            callback();
        },
    }

    createForm = (formSchema: FormSchema, values: any, form: WrappedFormUtils) => {
        const { gutter } = this.props;
        const components = Object.keys(formSchema).map(key =>
            this.getForm(key, formSchema[key], values, form));
        return (
            <Row gutter={gutter}>
                {components}
            </Row>
        );
    }

    render() {
        const {
            children,
            onValuesChange,
            formSchema,
            form,
            gutter = 8,
            values = {},
            layout = 'vertical',
            colon = false,
            ...other
        } = this.props;
        let component;
        if (typeof children === 'function') {
            component = children(form);
        } else if (React.isValidElement(children)) {
            component = children;
        } else if (formSchema) {
            component = this.createForm(formSchema, values, form);
        }
        return (
            <AntForm colon={colon} layout={layout} {...other}>
                {component}
            </AntForm>
        )
    }
}

Form.Item = AntForm.Item;

export default AntForm.create<FormProps>({
    onValuesChange: (props: any, changedValues: any, allValues: any) => {
        const { onValuesChange } = props;
        if (onValuesChange) {
            onValuesChange(props, changedValues, allValues);
        }
    },
})(Form);
