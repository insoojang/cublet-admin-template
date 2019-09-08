import React, { Component } from 'react';
import { Tabs } from 'antd';

import { Content, DetailContent } from '../layout';

class SystemSetting extends Component {
    render() {
        return (
            <Content>
                <DetailContent>
                    <Tabs tabPosition="left">
                        <Tabs.TabPane tab="Basic settings">
                            Basic settings
                        </Tabs.TabPane>
                    </Tabs>
                </DetailContent>
            </Content>
        )
    }
}
export default SystemSetting;
