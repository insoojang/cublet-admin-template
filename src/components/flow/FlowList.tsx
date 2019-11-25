import React, { Component } from 'react';
import { Table, Input, Modal, message, Switch, Button } from 'antd';
import i18next from 'i18next';
import { Link, RouteComponentProps } from 'react-router-dom';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import nProgress from 'nprogress';
import debounce from 'lodash/debounce';
import faker from 'faker';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';
import { Form } from '../form';
import { createColumns } from '../../utils';
import { FlowDatabase } from '../../databases';

export interface FlowMetadata {
    id: string;
    title: string;
    description?: string;
    enabled?: boolean;
}

interface IProps extends RouteComponentProps {

}

interface IState {
    modalVisible: boolean;
    loading: boolean;
    flowList: FlowMetadata[];
    searchText: string;
    flowMetadata?: FlowMetadata;
    isEdit: boolean;
}

class FlowList extends Component<IProps, IState> {
    form: WrappedFormUtils;

    state: IState = {
        modalVisible: false,
        loading: false,
        flowList: [],
        searchText: '',
        flowMetadata: null,
        isEdit: false,
    }

    componentDidMount() {
        this.getFlowList();
    }

    getFlowList = async () => {
        nProgress.start();
        this.setState({
            loading: true,
        });
        try {
            const response = await FlowDatabase.allDocs();
            const { rows } = response;
            const flowList = rows.map((row: any) => {
                const { doc, id } = row;
                return {
                    id,
                    title: doc.title || '',
                    description: doc.description || '',
                    enabled: doc.enabled || false,
                    thumbnail: doc.thumbnail || '',
                };
            });
            this.setState({
                loading: false,
                flowList,
            });
            nProgress.done();
        } catch (error) {
            this.setState({
                loading: false,
            });
            nProgress.done();
            message.warn(`${error}`);
        }
    }

    getColumns = () => createColumns([
        {
            key: 'title',
            dataIndex: 'title',
            title: i18next.t('common.name'),
            render: (text, record) => {
                return (
                    <Link to={`/flow/${record.id}`}>{text}</Link>
                );
            },
        },
        {
            key: 'description',
            dataIndex: 'description',
            title: i18next.t('common.description'),
        },
        {
            key: 'enabled',
            dataIndex: 'enabled',
            title: i18next.t('action.enabled'),
            render: (text, record) => <Switch checked={record.enabled} onChange={checked => this.handleChangeEnabled(record.id, checked)} />,
        },
        {
            key: 'action',
            width: 96,
            render: (text, record) => {
                return (
                    <div className="cublet-action-btn-group">
                        <Button key="modify" shape="circle" size="small" icon="edit" onClick={() => this.handleEditFlow(record)} />
                        <Button key="delete" shape="circle" size="small" icon="delete" type="danger" onClick={() => this.handleDeleteFlow(record)} />
                    </div>
                );
            },
        },
    ]);

    getDataSource = () => {
        const { flowList, searchText } = this.state;
        return flowList.filter(flow =>
            flow.title.toLowerCase().includes(searchText.toLowerCase())
            || flow.description.toLowerCase().includes(searchText.toLowerCase()));
    }

    handleModalVisible = (modalVisible: boolean) => {
        this.setState({
            modalVisible,
            flowMetadata: null,
        });
    }

    handleSaveFlow = () => {
        nProgress.start();
        this.setState({
            loading: true,
        });
        this.form.validateFields(async (err, values) => {
            if (err) {
                return;
            }
            try {
                const { isEdit, flowMetadata } = this.state;
                const id = isEdit ? flowMetadata.id : faker.random.uuid();
                if (isEdit) {
                    await FlowDatabase.save({
                        _id: id,
                        ...flowMetadata,
                        ...values,
                        thumbnail: faker.random.image(),
                    });
                    this.getFlowList();
                } else {
                    await FlowDatabase.create({
                        _id: id,
                        ...values,
                        thumbnail: faker.random.image(),
                    });
                    this.props.history.push(`/flow/${id}`);
                    this.props.location.pathname = `/flow/${id}`;
                }
                this.setState({
                    loading: false,
                    modalVisible: false,
                    flowMetadata: null,
                    isEdit: false,
                });
                nProgress.done();
            } catch (error) {
                this.setState({
                    loading: false,
                });
                nProgress.done();
                message.warn(`${error}`);
            }
        });
    }

    handleChangeEnabled = async (id: string, checked: boolean) => {
        nProgress.start();
        this.setState({
            loading: true,
        });
        try {
            await FlowDatabase.save({
                _id: id,
                enabled: checked,
            });
            this.getFlowList();
            this.setState({
                loading: false,
            });
            nProgress.done();
        } catch (error) {
            this.setState({
                loading: false,
            });
            nProgress.done();
            message.warn(`${error}`);
        }
    }

    handleEditFlow = (flowMetadata: FlowMetadata) => {
        this.setState({
            flowMetadata,
            modalVisible: true,
            isEdit: true,
        });
    }

    handleDeleteFlow = (flowMetadata: FlowMetadata) => {
        Modal.confirm({
            title: i18next.t('action.delete-confirm', { arg: flowMetadata.title }),
            onOk: async () => {
                nProgress.start();
                this.setState({
                    loading: true,
                });
                try {
                    await FlowDatabase.delete(flowMetadata.id);
                    this.getFlowList();
                    this.setState({
                        loading: false,
                    });
                    nProgress.done();
                } catch (error) {
                    this.setState({
                        loading: false,
                    });
                    nProgress.done();
                    message.warn(`${error}`);
                }
            },
        });
    }

    handleSearchFlow = debounce((searchText: string) => {
        this.setState({
            searchText,
        });
    }, 500);

    renderTitleAction = () => {
        return (
            <Input.Search
                style={{ width: 240 }}
                placeholder={i18next.t('flow.flow-search')}
                onSearch={value => this.handleSearchFlow(value)}
                onChange={e => this.handleSearchFlow(e.target.value)}
            />
        );
    }

    render() {
        const { modalVisible, flowMetadata, isEdit } = this.state;
        const dataSource = this.getDataSource();
        return (
            <Content
                titleText={`${i18next.t('flow.flow')} (${dataSource.length})`}
                titleAction={this.renderTitleAction()}
                action={<Dial icon="plus" cancelIcon="plus" onClick={() => this.handleModalVisible(true)} />}
            >
                <DetailContent>
                    <Table
                        rowKey="id"
                        columns={this.getColumns()}
                        dataSource={dataSource}
                        pagination={false}
                    />
                </DetailContent>
                <Modal
                    title={isEdit ? i18next.t('flow.modify') : i18next.t('flow.add')}
                    visible={modalVisible}
                    maskClosable={true}
                    onOk={this.handleSaveFlow}
                    okText={i18next.t('action.save')}
                    onCancel={() => this.handleModalVisible(false)}
                    destroyOnClose={true}
                >
                    <Form
                        ref={(c: any) => { this.form = c; }}
                        values={flowMetadata}
                        formSchema={{
                            title: {
                                label: i18next.t('common.name'),
                                required: true,
                            },
                            description: {
                                label: i18next.t('common.description'),
                            },
                            enabled: {
                                label: i18next.t('action.enabled'),
                                type: 'boolean',
                                initialValue: true,
                            },
                        }}
                    />
                </Modal>
            </Content>
        )
    }
}
export default FlowList;
