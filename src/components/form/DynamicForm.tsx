import React, { Component } from 'react';
import uuid from 'uuid';
import { Collapse, Button, Icon } from 'antd';

import { Form } from '.';
import { FormProps } from './Form';
import i18next from 'i18next';

export interface DynamicFormProps extends Omit<FormProps, 'onChange' | 'form'> {
    value?: { [key: string]: DynamicData };
    label?: string;
    onChange?: (datas: { [key: string]: DynamicData }) => void;
}

interface DynamicData {
    [key: string]: any;
}

interface IState {
    datas?: { [key: string]: DynamicData };
    activeKey?: string[];
}

class DynamicForm extends Component<DynamicFormProps> {
    forms: { [key: string]: typeof Form } = {};

    state: IState = {
        datas: this.props.value || { [uuid()]: {} },
        activeKey: [],
    }

    UNSAFE_componentWillReceiveProps(nextProps: DynamicFormProps) {
        if (JSON.stringify(nextProps.value) !== JSON.stringify(this.props.value)) {
            this.setState({
                datas: Object.assign({}, nextProps.value),
            });
        }
    }

    handleAddForm = () => {
        const id = uuid();
        this.setState({
            datas: Object.assign({}, this.state.datas, { [id]: {} }),
            activeKey: this.state.activeKey.concat(id),
        }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(this.state.datas);
            }
        });
    }

    handleCloneForm = (data: DynamicData) => {
        const id = uuid();
        this.setState({
            datas: Object.assign({}, this.state.datas, { [id]: data }),
            activeKey: this.state.activeKey.concat(id),
        }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(this.state.datas);
            }
        });
    }

    handleRemoveForm = (id: string) => {
        delete this.state.datas[id];
        this.setState({
            datas: this.state.datas,
            activeKey: this.state.activeKey.filter(activeKey => activeKey !== id),
        }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(this.state.datas);
            }
        });
    }

    handleValuesChange = (allValues: any, formKey: string, isSingle: boolean) => {
        const targetDatas = Object.assign({}, this.state.datas[formKey], allValues);
        const datas = Object.assign({}, this.state.datas, { [formKey]: targetDatas });
        const { onChange } = this.props;
        if (onChange) {
            onChange(datas);
        }
    }

    handleChangeActiveKey = (activeKey: string | string[]) => {
        this.setState({
            activeKey,
        });
    }

    render() {
        const {
            formSchema,
            label,
        } = this.props;
        const { datas, activeKey } = this.state;
        return (
            <div className="gyul-dynamic-form">
                {Object.keys(datas).length ? (
                    <Collapse activeKey={activeKey} onChange={this.handleChangeActiveKey}>
                        {Object.keys(datas).map((key, index) => {
                            return (
                                <Collapse.Panel
                                    key={key}
                                    header={`${label}_${index}`}
                                    extra={[
                                        <Icon
                                            key="copy"
                                            className="gyul-action-icon"
                                            type="copy"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.handleCloneForm(datas[key]);
                                            }}
                                        />,
                                        <Icon
                                            key="delete"
                                            className="gyul-action-icon"
                                            type="delete"
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.handleRemoveForm(key);
                                            }}
                                        />,
                                    ]}
                                >
                                    <Form
                                        wrappedComponentRef={(c: any) => { this.forms[key] = c; }}
                                        useForm={false}
                                        formSchema={formSchema}
                                        formKey={key}
                                        onValuesChange={this.handleValuesChange}
                                        values={datas[key]}
                                    />
                                </Collapse.Panel>
                            );
                        })}
                    </Collapse>
                    ) : null
                }
                <Button icon="plus" onClick={this.handleAddForm}>{i18next.t('action.add')}</Button>
            </div>
        )
    }
}

export default DynamicForm;
