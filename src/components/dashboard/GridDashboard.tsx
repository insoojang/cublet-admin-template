import React, { Component } from 'react';
import { Modal, Row, Col, Card, Menu, message } from 'antd';
import GridLayout from 'react-grid-layout';
import ReactResizeDetector from 'react-resize-detector';
import i18next from 'i18next';
import isEmpty from 'lodash/isEmpty';
import faker from 'faker';
import domToImage from 'dom-to-image';

import { Content } from '../layout';
import { Dial } from '../dial';
import GridWidget, { IGridWidget } from '../widget/GridWidget';
import { GridWidgetEdit } from '../widget';
import GridWidgetSchema from '../widget/schema/grid';
import { Form } from '../form';
import { DashboardProps } from './Dashboard';
import { DashboardDatabase } from '../../databases';

interface IProps {
    dashboard?: DashboardProps;
    widgets?: IGridWidget[];
}

interface IState {
    dashboard: DashboardProps;
    modalVisible: boolean;
    editVisible: boolean;
    settingVisible: boolean;
    widgets: IGridWidget[];
    selectedWidget?: IGridWidget;
}

class GridDashboard extends Component<IProps, IState> {
    settingForm: any;

    state: IState = {
        dashboard: this.props.dashboard,
        modalVisible: false,
        editVisible: false,
        settingVisible: false,
        widgets: this.props.widgets,
        selectedWidget: null,
    }

    UNSAFE_componentWillReceiveProps(nextProps: IProps) {
        if (JSON.stringify(nextProps.dashboard) !== JSON.stringify(this.props.dashboard)) {
            this.setState({
                dashboard: nextProps.dashboard,
            });
        }
        if (JSON.stringify(nextProps.widgets) !== JSON.stringify(this.props.widgets)) {
            this.setState({
                widgets: nextProps.widgets,
            });
        }
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

    handleSettingVisible = (settingVisible: boolean) => {
        this.setState({
            settingVisible,
        });
    }

    handleDeleteWidget = (widget: IGridWidget) => {
        this.setState({
            widgets: this.state.widgets.filter(w => w.id !== widget.id),
        });
    }

    handleAddWidget = (type: any) => {
        this.setState({
            editVisible: true,
            modalVisible: false,
            selectedWidget: {
                id: faker.random.uuid(),
                type,
            },
        });
    }

    handleEditWidget = (widget: IGridWidget) => {
        this.setState({
            editVisible: true,
            selectedWidget: widget,
        });
    }

    handleSaveWidget = (widget: IGridWidget) => {
        if (isEmpty(this.state.selectedWidget.properties)) {
            this.setState({
                widgets: this.state.widgets.concat(widget),
                editVisible: false,
                selectedWidget: null,
            });
        } else {
            this.setState({
                widgets: this.state.widgets.filter(w => w.id !== widget.id).concat(widget),
                editVisible: false,
                selectedWidget: null,
            });
        }
    }

    handleCloneWidget = (widget: IGridWidget) => {
        this.setState({
            widgets: this.state.widgets.concat({
                ...widget,
                id: faker.random.uuid(),
            }),
        });
    }

    handleSaveDashboardSetting = () => {
        this.settingForm.validateFields(async (err: any, values: any) => {
            if (err) {
                return;
            }
            const dashboard = Object.assign({}, this.state.dashboard, values);
            try {
                await DashboardDatabase.save({
                    _id: dashboard.id,
                    ...dashboard,
                });
                this.setState({
                    dashboard,
                    settingVisible: false,
                }, () => {
                    this.settingForm.resetFields();
                });
            } catch (error) {
                message.warn(`${error}`);
            }
        });
    }

    handleLayoutChange = (layouts: GridLayout.Layout[]) => {
        layouts.forEach((layout, index) => {
            this.state.widgets[index].position = layout;
        });
        this.setState({
            widgets: this.state.widgets,
        });
    }

    handleSaveDashboard = async () => {
        const { dashboard, widgets } = this.state;
        try {
            const thumbnail = await domToImage.toPng(document.querySelector('.track-view'));
            await DashboardDatabase.save({
                _id: dashboard.id,
                ...dashboard,
                widgets,
                thumbnail,
            });
        } catch (error) {
            message.warn(`${error}`);
        }
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
            const { id, position = { x: 0, y: 0, w: 2, h: 8, minH: 8 } } = widget;
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
        const {
            dashboard,
            modalVisible,
            editVisible,
            settingVisible,
            widgets,
            selectedWidget,
        } = this.state;
        return (
            <Content
                titleText={(dashboard && dashboard.title) || i18next.t('dashboard.empty-title')}
                action={
                    <Dial icon="edit">
                        <Dial.Button key="save" icon="save" onClick={this.handleSaveDashboard} />
                        <Dial.Button key="setting" icon="setting" onClick={() => this.handleSettingVisible(true)} />
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
                            className="gyul-dashboard-grid-layout"
                            cols={8}
                            rowHeight={10}
                            width={width}
                            draggableHandle=".gyul-widget-grid-header"
                            onLayoutChange={this.handleLayoutChange}
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
                    width={720}
                >
                    <Row gutter={8}>
                        {
                            Object.keys(GridWidgetSchema).map(key => {
                                return (
                                    <Col key={key} md={24} lg={6} onClick={() => this.handleAddWidget(key)}>
                                        <Card
                                            className="gyul-dashboard-add-template"
                                            hoverable={true}
                                        >
                                            {i18next.t(`widget.${key}.title`)}
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Modal>
                <Modal
                    visible={settingVisible}
                    closable={true}
                    onCancel={() => this.handleSettingVisible(false)}
                    okText={i18next.t('action.save')}
                    cancelText={i18next.t('action.close')}
                    onOk={this.handleSaveDashboardSetting}
                >
                    <Form
                        ref={(c: any) => { this.settingForm = c; }}
                        formSchema={{
                            title: {
                                type: 'text',
                                required: true,
                                label: i18next.t('dashboard.name'),
                            },
                            description: {
                                type: 'textarea',
                                label: i18next.t('common.description'),
                            },
                        }}
                    />
                </Modal>
            </Content>
        )
    }
}
export default GridDashboard;
