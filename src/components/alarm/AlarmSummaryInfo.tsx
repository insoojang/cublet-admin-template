import React, { Component } from 'react';
import { Row, Col, Card, Result } from 'antd';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

class AlarmSummaryInfo extends Component {
    render() {
        return (
            <div className="cublet-alarm-summary-info">
                <Row gutter={48}>
                    <Link to="/alarm/list">
                        <Col md={24} lg={8}>
                            <Card
                                hoverable={true}
                                title={i18next.t('alarm.info')}
                            >
                            <Result status="info" title={'12/24'} />
                            </Card>
                        </Col>
                    </Link>
                    <Link to="/alarm/list">
                        <Col md={24} lg={8}>
                            <Card
                                hoverable={true}
                                title={i18next.t('alarm.warning')}
                            >
                                <Result status="warning" title={'12/24'} />
                            </Card>
                        </Col>
                    </Link>
                    <Link to="/alarm/list">
                        <Col md={24} lg={8}>
                            <Card
                                hoverable={true}
                                title={i18next.t('alarm.critical')}
                            >
                                <Result status="error" title={'12/24'} />
                            </Card>
                        </Col>
                    </Link>
                </Row>
            </div>
        )
    }
}

export default AlarmSummaryInfo;
