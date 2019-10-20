import React, { Component } from 'react';

import { Content } from '../layout';
import MonitoringTree from './MonitoringTree';
import MonitoringContent from './MonitoringContent';
import { ModuleContext } from '../../containers/ModuleContainer';

class Monitoring extends Component {
    static contextType = ModuleContext;
    render() {
        console.log(this.context);
        return (
            <Content scroll={false}>
                <MonitoringTree />
                <Content
                    title={'Monitoring'}
                    scroll={false}
                >
                    <div className="gyul-monitoring">
                        <MonitoringContent />
                    </div>
                </Content>
            </Content>
        )
    }
}
export default Monitoring;
