import React, { Component } from 'react';
import faker from 'faker';
import { Row, Col, Card, Icon, Input, Modal, message } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import i18next from 'i18next';
import debounce from 'lodash/debounce';
import nProgress from 'nprogress';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';
import { EmptyPage } from '../error';
import { DashboardDatabase } from '../../databases';

interface IProps extends RouteComponentProps {

}

interface IState {
    dashboardList: any[];
    searchText: string;
    modalVisible: boolean;
    loading: boolean;
}

class DashboardList extends Component<IProps, IState> {
    state: IState = {
        dashboardList: [],
        searchText: '',
        modalVisible: false,
        loading: false,
    }

    componentDidMount() {
        this.getDashboardList();
    }

    getDashboardList = async () => {
        nProgress.start();
        this.setState({
            loading: true,
        });
        try {
            const response = await DashboardDatabase.allDocs();
            const { rows } = response;
            const dashboardList = rows.map((row: any) => {
                const { doc, id } = row;
                return {
                    id,
                    title: doc.title || '',
                    type: doc.type || 'grid',
                    description: doc.description || '',
                    thumbnail: doc.thumbnail || '',
                };
            });
            this.setState({
                loading: false,
                dashboardList,
            });
            nProgress.done();
        } catch (error) {
            this.setState({
                loading: false,
            });
            message.warn(`${error}`);
            nProgress.done();
        }
    }

    getDataSource = () => {
        const { dashboardList, searchText } = this.state;
        return dashboardList.filter(dashboard =>
            dashboard.title.toLowerCase().includes(searchText.toLowerCase())
            || dashboard.description.toLowerCase().includes(searchText.toLowerCase()));
    }

    handleSearchDashboard = debounce((searchText: string) => {
        this.setState({
            searchText,
        });
    }, 500)

    handleModalVisible = (modalVisible: boolean) => {
        this.setState({
            modalVisible,
        });
    }

    handleSaveDashboard = async (type: string = 'grid') => {
        nProgress.start();
        this.setState({
            loading: true,
        });
        try {
            const id = faker.random.uuid();
            await DashboardDatabase.create({
                _id: id,
                title: i18next.t('dashboard.empty-title'),
                type,
                description: '',
                thumbnail: faker.random.image(),
            });
            this.props.history.push(`/dashboard/${id}`);
            this.props.location.pathname = `/dashboard/${id}`;
            this.setState({
                modalVisible: false,
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

    renderDashboardList = () => {
        return this.getDataSource().map(data => {
            return (
                <Col key={data.id} md={24} lg={8} xl={6} onClick={() => this.props.history.push(`/dashboard/${data.id}`)}>
                    <Card
                        style={{ marginBottom: 16 }}
                        bodyStyle={{ height: 100 }}
                        cover={<img src={data.thumbnail} alt="" />}
                        hoverable={true}
                        actions={[
                            <Icon
                                key="download"
                                type="download"
                                onClick={e => {
                                    e.stopPropagation();
                                    // UtilTools.saveBlob(texture.file, texture.name);
                                }}
                            />,
                            <Icon
                                key="delete"
                                type="delete"
                                onClick={e => {
                                    e.stopPropagation();
                                    Modal.confirm({
                                        title: i18next.t('action.delete-confirm', { arg: data.title }),
                                        onOk: async () => {
                                            try {
                                                nProgress.start();
                                                await DashboardDatabase.delete(data.id);
                                                this.getDashboardList();
                                            } catch (error) {
                                                message.warn(`${error}`);
                                            }
                                        },
                                    });
                                }}
                            />,
                        ]}
                    >
                        <Card.Meta
                            title={data.title}
                            description={data.description}
                        />
                    </Card>
                </Col>
            )
        });
    }

    renderTitleAction = () => {
        return (
            <Input.Search
                style={{ width: 240 }}
                placeholder={i18next.t('dashboard.dashboard-search')}
                onSearch={value => this.handleSearchDashboard(value)}
                onChange={e => this.handleSearchDashboard(e.target.value)}
            />
        );
    }

    render() {
        const { modalVisible } = this.state;
        const dashboardList = this.renderDashboardList();
        return (
            <Content
                titleText={`${i18next.t('dashboard.dashboard')} (30)`}
                titleAction={this.renderTitleAction()}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="add" icon="plus" onClick={() => this.handleModalVisible(true)} />
                        <Dial.Button key="delete" icon="delete" />
                    </Dial>
                }
            >
                {
                    dashboardList.length ? (
                        <DetailContent>
                            <Row gutter={16}>
                                {this.renderDashboardList()}
                            </Row>
                        </DetailContent>
                    ) : <EmptyPage />
                }
                <Modal
                    visible={modalVisible}
                    footer={null}
                    closable={true}
                    onCancel={() => this.handleModalVisible(false)}
                >
                    <Row gutter={8}>
                        <Col md={24} lg={12} onClick={() => this.handleSaveDashboard('grid')}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Grid layout
                            </Card>
                        </Col>
                        <Col md={24} lg={12} onClick={() => this.handleSaveDashboard('free')}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Free layout
                            </Card>
                        </Col>
                    </Row>
                </Modal>
            </Content>
        )
    }
}
export default DashboardList;
