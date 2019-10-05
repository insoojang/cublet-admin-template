import React, { Component } from 'react';
import { Row, Col } from 'antd';

import Panel from './Panel';
import { MetricChart } from '../metric';

class Metrics extends Component {
    render() {
        return (
            <Panel
                title={'test'}
            >
                <Row gutter={16}>
                    <Col md={24} lg={12}>
                        <MetricChart />
                    </Col>
                    <Col md={24} lg={12}>
                        <MetricChart />
                    </Col>
                    <Col md={24} lg={12}>
                        <MetricChart />
                    </Col>
                    <Col md={24} lg={12}>
                        <MetricChart />
                    </Col>
                </Row>
            </Panel>
        )
    }
}
export default Metrics;
