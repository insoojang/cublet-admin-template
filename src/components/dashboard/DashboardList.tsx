import React, { Component } from 'react';
import faker from 'faker';
import { Row, Col, Card, Icon, Radio, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import debounce from 'lodash/debounce';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';
import { EmptyPage } from '../error';

interface IProps {

}

interface IState {
    dashboardList: any[];
    searchText: string;
    modalVisible: boolean;
}

class DashboardList extends Component<IProps, IState> {
    state: IState = {
        dashboardList: Array.from({ length: 30 }).map(() => {
            return {
                id: faker.random.uuid(),
                title: faker.name.title(),
                description: faker.random.words(3),
                owner: faker.name.firstName(),
                image: faker.random.image(),
            };
        }),
        searchText: '',
        modalVisible: false,
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

    renderDashboardList = () => {
        return this.getDataSource().map(data => {
            return (
                <Col key={data.id} md={24} lg={8} xl={6}>
                    <Link to={`/dashboard/${data.id}`}>
                        <Card
                            style={{ marginBottom: 16 }}
                            bodyStyle={{ height: 100 }}
                            cover={<img src={data.image} alt="" />}
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
                                        // ImageDatabase.delete(texture.id)
                                        // .then(() => {
                                        //     this.getTextures();
                                        // });
                                    }}
                                />,
                            ]}
                        >
                            <Card.Meta
                                title={data.title}
                                description={data.description}
                            />
                        </Card>
                    </Link>
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
                        <Col md={24} lg={12}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Grid layout
                            </Card>
                        </Col>
                        <Col md={24} lg={12}>
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
