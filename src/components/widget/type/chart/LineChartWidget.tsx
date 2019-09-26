import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import { WidgetProps } from '../../Widget';
import { createChartOption } from '../../../../utils';

class LineChartWidget extends Component<WidgetProps> {
    getOption = () => {
        return createChartOption({
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    type: 'line',
                    data: [
                        [1, 1],
                        [2, 2],
                    ],
                },
            ],
        });
    }

    render() {
        const { width, height } = this.props;
        return (
            <ReactEcharts
                style={{ width, height }}
                option={this.getOption()}
            />
        )
    }
}

export default LineChartWidget;
