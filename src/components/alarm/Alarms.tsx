import React, { Component } from 'react';

import { Content } from '../layout';
import { AlarmSummaryInfo, AlarmSummaryList } from '.';

class Alarms extends Component {
    render() {
        return (
            <Content>
                <AlarmSummaryInfo />
                <AlarmSummaryList />
            </Content>
        )
    }
}

export default Alarms;
