import React, { Component } from 'react';
import faker from 'faker';
import { Row, Col, Card, Icon } from 'antd';

import { Content, DetailContent } from '../layout';
import i18next from 'i18next';

class DashboardList extends Component {
    getDataSource = () => {
        return Array.from({ length: 30 }).map(() => {
            return {
                id: faker.random.uuid(),
                title: faker.name.title(),
                description: faker.random.words(3),
                owner: faker.name.firstName(),
                image: faker.random.image(),
            };
        });
    }

    renderDashboardList = () => {
        return this.getDataSource().map(data => {
            return (
                <Col key={data.id} md={24} lg={8} xl={6}>
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
                </Col>
            )
        });
    }

    render() {
        return (
            <Content
                title={i18next.t('dashboard.dashboard')}
            >
                <DetailContent>
                    <Row gutter={16}>
                        {this.renderDashboardList()}
                    </Row>
                </DetailContent>
            </Content>
        )
    }
}
export default DashboardList;
