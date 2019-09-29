import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import isEmpty from 'lodash/isEmpty';

import { WidgetProps } from '../../Widget';
import { createChartOption } from '../../../../utils';

class LineChartWidget extends Component<WidgetProps> {
    getOption = () => {
        const { widget } = this.props;
        const { properties } = widget;
        const { series, xAxis, yAxis } = properties;
        return createChartOption({
            xAxis: {
                type: 'value',
            },
            yAxis: {
                type: 'value',
            },
            series: series ? Object.values(series).map(series => {
                if (isEmpty(series)) {
                    return {
                        type: 'line',
                        data: [[1, Math.random() * 100], [2, Math.random() * 100]],
                    };
                }
                return {
                    type: series.type,
                    data: [[1, Math.random() * 100], [2, Math.random() * 100]],
                    areaStyle: series.isArea ? {} : null,
                }
            }) : [{
                type: 'line',
                data: [[1, Math.random() * 100], [2, Math.random() * 100]],
            }],
        });
    }

    render() {
        const { width, height } = this.props;
        const option = this.getOption();
        return (
            <ReactEcharts
                style={{ width, height }}
                notMerge={true}
                option={option}
            />
        )
    }
}

export default LineChartWidget;
