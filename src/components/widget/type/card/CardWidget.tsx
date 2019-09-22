import React, { Component } from 'react';
import { Progress } from 'antd';

import { WidgetProps } from '../../Widget';
import { EmptyPage } from '../../../error';
import { NumberSimulator } from '../../../../simulators';

@NumberSimulator()
class CardWidget extends Component<WidgetProps & { randomValue: number }> {

    renderGauge = (properties: any, value: number) => {
        return (
            <Progress type="dashboard" percent={value} />
        );
    }

    renderValue = (properties: any, value: number) => {
        return (value);
    }

    renderCard = (properties: any, value: number) => {
        const { type = { type: 'value' } } = properties;
        if (type.type === 'gauge') {
            return this.renderGauge(properties, value);
        } else {
            return this.renderValue(properties, value);
        }
    }

    render() {
        const { widget, randomValue } = this.props;
        const { properties } = widget;
        return (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                {randomValue ? this.renderCard(properties, randomValue) : <EmptyPage />}
            </div>
        )
    }
}

export default CardWidget;
