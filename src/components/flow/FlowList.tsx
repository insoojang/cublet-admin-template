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
}

class FlowList extends Component<IProps, IState> {
    form: WrappedFormUtils;

    state: IState = {
        modalVisible: false,
        loading: false,
        flowList: [],
        searchText: '',
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
            width: 48,
            render: (text, record) => {
                return [
                    <Button key="delete" shape="circle" size="small" icon="delete" type="danger" onClick={() => this.handleDeleteFlow(record)} />,
                ]
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
                const id = faker.random.uuid();
                await FlowDatabase.create({
                    _id: id,
                    ...values,
                    thumbnail: faker.random.image(),
                });
                this.props.history.push(`/flow/${id}`);
                this.props.location.pathname = `/flow/${id}`;
                this.setState({
                    loading: false,
                    modalVisible: false,
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

    handleDeleteFlow = (flow: FlowMetadata) => {
        Modal.confirm({
            title: i18next.t('action.delete-confirm', { arg: flow.title }),
            onOk: async () => {
                nProgress.start();
                this.setState({
                    loading: true,
                });
                try {
                    await FlowDatabase.delete(flow.id);
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
        const { modalVisible } = this.state;
        return (
            <Content
                titleText={`${i18next.t('flow.flow')} (100)`}
                titleAction={this.renderTitleAction()}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="add" icon="plus" onClick={() => this.handleModalVisible(true)} />
                        <Dial.Button key="delete" icon="delete" />
                    </Dial>
                }
            >
                <DetailContent>
                    <Table
                        rowKey="id"
                        columns={this.getColumns()}
                        dataSource={this.getDataSource()}
                        pagination={false}
                    />
                </DetailContent>
                <Modal
                    title={i18next.t('flow.add')}
                    visible={modalVisible}
                    maskClosable={true}
                    onOk={this.handleSaveFlow}
                    okText={i18next.t('action.save')}
                    onCancel={() => this.handleModalVisible(false)}
                    destroyOnClose={true}
                >
                    <Form
                        ref={(c: any) => { this.form = c; }}
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
