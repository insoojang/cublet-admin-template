import React, { Component } from 'react';
import { Modal, Row, Col, Card, Menu } from 'antd';
import GridLayout from 'react-grid-layout';
import ReactResizeDetector from 'react-resize-detector';
import faker from 'faker';
import i18next from 'i18next';

import { Content } from '../layout';
import { Dial } from '../dial';
import GridWidget, { IGridWidget } from '../widget/GridWidget';
import { GridWidgetEdit } from '../widget';

interface IProps {

}

interface IState {
    modalVisible: boolean;
    editVisible: boolean;
    widgets: IGridWidget[];
    selectedWidget?: IGridWidget;
}

class GridDashboard extends Component<IProps, IState> {
    state: IState = {
        modalVisible: false,
        editVisible: false,
        widgets: [
            {
                id: faker.random.uuid(),
                title: faker.name.title(),
                type: 'card',
                properties: {},
            },
            {
                id: faker.random.uuid(),
                title: faker.name.title(),
                type: 'card',
                properties: {},
            },
            {
                id: faker.random.uuid(),
                title: faker.random.words(10),
                type: 'card',
                properties: {},
            },
            {
                id: faker.random.uuid(),
                title: faker.name.title(),
                type: 'card',
                properties: {},
            },
        ],
        selectedWidget: null,
    }

    handleModalVisible = (modalVisible: boolean) => {
        this.setState({
            modalVisible,
        });
    }

    handleEditVisible = (editVisible: boolean) => {
        this.setState({
            editVisible,
        });
    }

    handleDeleteWidget = (widget: IGridWidget) => {
        this.setState({
            widgets: this.state.widgets.filter(w => w.id !== widget.id),
        });
    }

    handleAddWidget = () => {
        this.setState({
            editVisible: true,
            modalVisible: false,
            selectedWidget: null,
        });
    }

    handleEditWidget = (widget: IGridWidget) => {
        this.setState({
            editVisible: true,
            selectedWidget: widget,
        });
    }

    handleSaveWidget = (widget: IGridWidget) => {
        this.setState({
            widgets: this.state.widgets.concat(widget),
            editVisible: false,
            selectedWidget: null,
        });
    }

    handleCloneWidget = (widget: IGridWidget) => {
        this.setState({
            widgets: this.state.widgets.concat({
                ...widget,
                id: faker.random.uuid(),
            }),
        });
    }

    renderSetting = (widget: IGridWidget) => {
        return [
            <Menu.Item key="clone" onClick={() => this.handleCloneWidget(widget)}>
                {i18next.t('widget.clone')}
            </Menu.Item>,
            <Menu.Item key="modify" onClick={() => this.handleEditWidget(widget)}>
                {i18next.t('widget.modify')}
            </Menu.Item>,
            <Menu.Item key="delete" onClick={() => this.handleDeleteWidget(widget)}>
                {i18next.t('widget.delete')}
            </Menu.Item>,
        ];
    }

    renderWidgets = (widgets: IGridWidget[]) => {
        return widgets.map(widget => {
            const { id, position = { x: 0, y: 0, w: 1, h: 8, minH: 8 } } = widget;
            return (
                <div key={id} data-grid={position}>
                    <GridWidget
                        key={id}
                        widget={widget}
                        action={this.renderSetting(widget)}
                    />
                </div>
            );
        });
    }

    render() {
        const { modalVisible, editVisible, widgets, selectedWidget } = this.state;
        return (
            <Content
                titleText={'Test Dashboard'}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="save" icon="save" />
                        <Dial.Button key="add" icon="plus" onClick={() => this.handleModalVisible(true)} />
                    </Dial>
                }
                extraContent={
                    <GridWidgetEdit
                        visible={editVisible}
                        onClose={() => this.handleEditVisible(false)}
                        onSave={this.handleSaveWidget}
                        widget={selectedWidget}
                    />
                }
            >
                <ReactResizeDetector handleWidth={true}>
                    {({ width = 0 }: { width: number }) => (
                        <GridLayout
                            cols={8}
                            rowHeight={10}
                            width={width}
                            draggableHandle=".gyul-widget-grid-header"
                        >
                            {this.renderWidgets(widgets)}
                        </GridLayout>
                    )}
                </ReactResizeDetector>
                <Modal
                    visible={modalVisible}
                    closable={true}
                    onCancel={() => this.handleModalVisible(false)}
                    footer={null}
                >
                    <Row gutter={8}>
                        <Col md={24} lg={6} onClick={this.handleAddWidget}>
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
export default GridDashboard;
