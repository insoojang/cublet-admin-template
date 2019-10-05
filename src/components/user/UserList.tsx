import React, { Component } from 'react';
import { Table, Input, Button } from 'antd';
import i18next from 'i18next';
import { RouteComponentProps } from 'react-router';
import faker from 'faker';

import { Content, DetailContent } from '../layout';
import { Dial } from '../dial';

interface IProps extends RouteComponentProps {

}

interface IState {

}

class UserList extends Component<IProps, IState> {
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

    renderTitleAction = () => {
        return (
            <>
                <Input.Search
                    style={{ width: 240 }}
                    placeholder={i18next.t('user.user-search')}
                />
                <Button icon="filter" />
            </>
        );
    }

    render() {
        return (
            <Content
                titleText={`${i18next.t('user.list')} (50)`}
                titleAction={this.renderTitleAction()}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="add" icon="plus" />
                        <Dial.Button key="delete" icon="delete" />
                    </Dial>
                }
            >
                <DetailContent>
                    <Table
                        columns={this.getColumns()}
                        dataSource={this.getDataSource()}
                        pagination={false}
                    />
                </DetailContent>
            </Content>
        )
    }
}

export default UserList;
