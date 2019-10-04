import React, { Component } from 'react';
import { Table } from 'antd';
import faker from 'faker';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

class RecentAlarmList extends Component {
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
        return Array.from({ length: 5 }).map(() => {
            return {
                id: faker.random.uuid(),
                name: faker.name.title(),
                description: faker.random.words(3),
            };
        });
    }

    render() {
        return (
            <Table
                bordered={true}
                columns={this.getColumns()}
                dataSource={this.getDataSource()}
                title={() => {
                    return (
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1 }}>
                                {i18next.t('alarm.recent-alarm')}
                            </div>
                            <div>
                                <Link to="/alarm/list">
                                    {i18next.t('action.more')}
                                </Link>
                            </div>
                        </div>
                    )
                }}
                showHeader={true}
                pagination={false}
            />
        )
    }
}

export default RecentAlarmList;
