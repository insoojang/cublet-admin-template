import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import i18next from 'i18next';

import Panel from './Panel';

class Overview extends Component {
    render() {
        return (
            <Panel
                title={'test'}
            >
                <Row gutter={16}>
                    <Col md={24} lg={8}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            test
                        </Card>
                    </Col>
                    <Col md={24} lg={16}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                            testtesttesttesttesttesttesttest
                        </Card>
                    </Col>
                    <Col md={24} lg={8}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            test
                        </Card>
                    </Col>
                    <Col md={24} lg={8}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            test
                        </Card>
                    </Col>
                    <Col md={24} lg={8}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            test
                        </Card>
                    </Col>
                    <Col md={24} lg={8}>
                        <Card
                            title={i18next.t('resource.status')}
                        >
                            test
                        </Card>
                    </Col>
                </Row>
            </Panel>
        )
    }
}
export default Overview;
