import React, { Component } from 'react';
import { Layout, Table } from 'antd';

class Content extends Component {
    render() {
        return (
            <Layout.Content className="gyul-content">
                <div className="gyul-content-title">
                    <div>
                        Content title
                    </div>
                </div>
                <div className="gyul-content-container">
                    <Table />
                </div>
            </Layout.Content>
        )
    }
}
export default Content;
