import React, { Component } from 'react';
import { Card, Icon, Dropdown, Menu } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import classnames from 'classnames';
import faker from 'faker';

import { Scrollbar } from '../scrollbar';
import Widget, { IWidget } from './Widget';

export interface IGridWidget extends IWidget {
    position?: ReactGridLayout.Layout;
}

export interface GridWidgetProps {
    widget: IGridWidget;
    action?: React.ReactNode;
    preview?: boolean;
    onClickSetting?: (widget: any) => void;
}

class GridWidget extends Component<GridWidgetProps> {
    handleClickSetting = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        const { onClickSetting } = this.props;
        if (onClickSetting) {
            onClickSetting({
                id: faker.random.uuid(),
                title: faker.random.words(10),
            });
        }
    }

    renderSetting = () => {
        const { action } = this.props;
        return (
            <Menu>
                {action}
            </Menu>
        );
    }

    renderTitle = (title: string, description: string) => {
        const { preview } = this.props;
        const className = classnames('gyul-widget-grid-header', {
            preview,
        });
        return (
            <div className={className}>
                <div className="gyul-widget-grid-header-title">
                    <div>{title}</div>
                </div>
                {!preview && <div className="gyul-widget-grid-header-action">
                    <Dropdown overlay={this.renderSetting} trigger={['click']}>
                        <Icon type="setting" onClick={this.handleClickSetting} />
                    </Dropdown>
                </div>}
            </div>
        );
    }

    render() {
        const { widget } = this.props;
        return (
            <ReactResizeDetector handleWidth={true} handleHeight={true}>
                {({ width, height }: { width: number, height: number }) => (
                    <Card bodyStyle={{ width, height, overflow: 'hidden', padding: 0 }}>
                        <div className="gyul-widget-grid">
                            {this.renderTitle(widget.title, widget.description)}
                            <div className="gyul-widget-grid-content">
                                <Scrollbar>
                                    <Widget widget={widget} />
                                </Scrollbar>
                            </div>
                        </div>
                    </Card>
                )}
            </ReactResizeDetector>
        )
    }
}

export default GridWidget;
