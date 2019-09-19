import React, { Component } from 'react';
import { Table, Input } from 'antd';
import faker from 'faker';
import i18next from 'i18next';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';

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
                titleText={`${i18next.t('flow.flow')} (100)`}
                titleAction={
                    <Input.Search
                        style={{ width: 240 }}
                        placeholder={i18next.t('flow.flow-search')}
                    />
                }
                action={
                    <Dial icon="edit">
                        <Dial.Button key="add" icon="plus" />
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
            </Content>
        )
    }
}
export default FlowList;
