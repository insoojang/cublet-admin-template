import React, { Component } from 'react';
import { Card, Icon, Dropdown, Menu } from 'antd';
import ReactResizeDetector from 'react-resize-detector';
import classnames from 'classnames';
import faker from 'faker';

import { Widget } from '.';
import { Scrollbar } from '../scrollbar';
import { FormSchema } from '../form/Form';

export interface IGridPosition {
    // A string corresponding to the component key
    i: string;
    // These are all in grid units, not pixels
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    maxW?: number;
    minH?: number;
    maxH?: number;
    // If true, equal to `isDraggable: false, isResizable: false`.
    static?: boolean;
    // If false, will not be draggable. Overrides `static`.
    isDraggable?: boolean;
    // If false, will not be resizable. Overrides `static`.
    isResizable?: boolean;
}

export interface IGridWidget {
    id?: string;
    title?: string;
    description?: string;
    type?: string;
    position?: IGridPosition;
    properties?: { [key: string]: FormSchema };
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
                                    <Widget />
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
