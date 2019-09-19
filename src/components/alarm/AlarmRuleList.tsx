import React, { Component } from 'react';
import { Table, Input } from 'antd';
import faker from 'faker';
import i18next from 'i18next';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';

class AlarmRuleList extends Component {
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
                titleText={`${i18next.t('alarm.rule')} (100)`}
                titleAction={
                    <Input.Search
                        style={{ width: 240 }}
                        placeholder={i18next.t('alarm.alarm-rule-search')}
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
export default AlarmRuleList;
