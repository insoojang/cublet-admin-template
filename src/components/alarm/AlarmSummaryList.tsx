import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { RecentAlarmList, RecentAlarmRuleList } from '.';

class AlarmSummaryList extends Component {
    render() {
        return (
            <div className="gyul-alarm-summary-list">
                <Row gutter={24}>
                    <Col md={24} lg={12}>
                        <RecentAlarmList />
                    </Col>
                    <Col md={24} lg={12}>
                        <RecentAlarmRuleList />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default AlarmSummaryList;
