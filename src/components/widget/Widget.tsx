import React, { Component } from 'react';

import { FormSchema } from '../form/Form';
import { EmptyPage } from '../error';
import WidgetTypes, { WidgetType,  } from './type';
import ReactResizeDetector from 'react-resize-detector';

export interface IWidgetProperties {
    [key: string]: FormSchema;
}

export interface IWidget {
    id?: string;
    title?: string;
    description?: string;
    position?: any;
    type?: WidgetType;
    properties?: IWidgetProperties;
}

export interface WidgetProps {
    width?: number;
    height?: number;
    widget?: IWidget;
}

class Widget extends Component<WidgetProps> {
    renderWidget = (width: number, height: number) => {
        const { widget } = this.props;
        const { type } = widget;
        const WidgetComponent = WidgetTypes[type];
        if (WidgetComponent) {
            return (
                <WidgetComponent
                    width={width}
                    height={height}
                    widget={widget}
                />
            );
        }
        return <EmptyPage />;
    }

    render() {
        return (
            <div className="gyul-widget">
                <ReactResizeDetector handleWidth={true} handleHeight={true}>
                    {({ width = 0, height = 0 }: { width: number, height: number}) => (this.renderWidget(width, height))}
                </ReactResizeDetector>
            </div>
        )
    }
}

export default Widget;
