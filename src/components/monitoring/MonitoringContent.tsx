import React, { Component } from 'react';
import { Tabs } from 'antd';

import { OverviewPanel, MetricPanel, SettingPanel } from './panel';

class MonitoringContent extends Component {
    render() {
        return (
            <div className="gyul-monitoring-content">
                <Tabs animated={false} tabPosition="right">
                    <Tabs.TabPane key="overview" tab="Overview">
                        <OverviewPanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="metric" tab="Metric">
                        <MetricPanel />
                    </Tabs.TabPane>
                    <Tabs.TabPane key="setting" tab="Setting">
                        <SettingPanel />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        )
    }
}
export default MonitoringContent;
