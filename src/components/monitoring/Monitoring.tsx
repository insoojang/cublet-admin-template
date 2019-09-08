import React, { Component } from 'react';

import { Content } from '../layout';
import MonitoringTree from './MonitoringTree';
import MonitoringContent from './MonitoringContent';
import MonitoringHeader from './MonitoringHeader';

class Monitoring extends Component {
    render() {
        return (
            <Content scroll={false}>
                <MonitoringTree />
                <Content
                    title={'Monitoring'}
                    scroll={false}
                >
                    <div className="gyul-monitoring">
                        <MonitoringHeader />
                        <MonitoringContent />
                    </div>
                </Content>
            </Content>
        )
    }
}
export default Monitoring;
