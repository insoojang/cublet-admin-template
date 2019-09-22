import React, { Component } from 'react';

import { FormSchema } from '../form/Form';
import { EmptyPage } from '../error';
import WidgetTypes, { WidgetType,  } from './type';

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
    widget?: IWidget;
}

class Widget extends Component<WidgetProps> {
    renderWidget = () => {
        const { widget } = this.props;
        const { type } = widget;
        const WidgetComponent = WidgetTypes[type];
        if (WidgetComponent) {
            return (
                <WidgetComponent
                    widget={widget}
                />
            );
        }
        return <EmptyPage />;
    }

    render() {
        return (
            <div className="gyul-widget">
                {this.renderWidget()}
            </div>
        )
    }
}

export default Widget;
