import React, { Component } from 'react';

import { Content } from '../layout';
import MonitoringTree from './MonitoringTree';
import MonitoringContent from './MonitoringContent';
import MonitoringHeader from './MonitoringHeader';

class Monitoring extends Component {
    render() {
        return (
            <Content
                title={'Monitoring'}
            >
                <MonitoringTree />
                <Content
                    title={<MonitoringHeader />}
                >
                    <MonitoringContent />
                </Content>
            </Content>
        )
    }
}
export default Monitoring;
