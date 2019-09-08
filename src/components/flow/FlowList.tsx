import React, { Component } from 'react';
import { Table } from 'antd';
import faker from 'faker';

import { Content, DetailContent } from '../layout';

class FlowList extends Component {
    getColumns = () => {
        return [
            {
                key: 'name',
                dataIndex: 'name',
                title: 'Name',
            },
            {
                key: 'description',
                dataIndex: 'description',
                title: 'Description',
            },
        ];
    }

    getDataSource = () => {
        return Array.from({ length: 100 }).map(() => {
            return {
                id: faker.random.uuid(),
                name: faker.name.title(),
                description: faker.random.words(3),
            };
        });
    }

    render() {
        return (
            <Content
                title={'test'}
            >
                <DetailContent>
                    <Table
                        rowKey="id"
                        columns={this.getColumns()}
                        dataSource={this.getDataSource()}
                        pagination={false}
                    />
                </DetailContent>
            </Content>
        )
    }
}
export default FlowList;
