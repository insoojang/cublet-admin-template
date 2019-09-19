import React, { Component } from 'react';
import { Modal, Row, Col, Card } from 'antd';

import { Content } from '../layout';
import { Dial } from '../dial';

interface IProps {

}

interface IState {
    modalVisible: boolean;
}

class Dashboard extends Component<IProps, IState> {
    state: IState = {
        modalVisible: false,
    }

    handleModalVisible = (modalVisible: boolean) => {
        this.setState({
            modalVisible,
        });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <Content
                titleText={'Test Dashboard'}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="save" icon="save" />
                        <Dial.Button key="add" icon="plus" onClick={() => this.handleModalVisible(true)} />
                    </Dial>
                }
            >
                Test Dashboard
                <Modal
                    visible={modalVisible}
                    closable={true}
                    onCancel={() => this.handleModalVisible(false)}
                    footer={null}
                >
                    <Row gutter={8}>
                        <Col md={24} lg={6}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Widget
                            </Card>
                        </Col>
                        <Col md={24} lg={6}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Widget
                            </Card>
                        </Col>
                        <Col md={24} lg={6}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Widget
                            </Card>
                        </Col>
                        <Col md={24} lg={6}>
                            <Card
                                className="gyul-dashboard-add-template"
                                hoverable={true}
                            >
                                Widget
                            </Card>
                        </Col>
                    </Row>
                </Modal>
            </Content>
        )
    }
}
export default Dashboard;
