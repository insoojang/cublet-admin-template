import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

import { WidgetProps } from '../../Widget';
import { createChartOption } from '../../../../utils';

class PieChartWidget extends Component<WidgetProps> {
    getOption = () => {
        return createChartOption({
            series: [
                {
                    type: 'pie',
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

export default PieChartWidget;
