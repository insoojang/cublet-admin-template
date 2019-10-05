import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import isEmpty from 'lodash/isEmpty';

import { WidgetProps } from '../../Widget';
import { createChartOption } from '../../../../utils';
import { TimeseriesSimulator } from '../../../../simulators';

class LineChartWidget extends Component<WidgetProps> {
    simulator = new TimeseriesSimulator();

    getOption = () => {
        const { widget } = this.props;
        const { properties } = widget;
        const { series, xAxis, yAxis } = properties;
        const { xData, yData } = this.simulator.init();
        return createChartOption({
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: xData,
            },
            yAxis: {
                type: 'value',
            },
            grid: {
                right: 20,
                left: 30,
                bottom: 30,
                top: 10,
            },
            series: series ? Object.values(series).map(series => {
                const { yData } = this.simulator.init();
                if (isEmpty(series)) {
                    return {
                        type: 'line',
                        data: yData,
                    };
                }
                return {
                    type: series.type,
                    data: yData,
                    areaStyle: series.isArea ? {} : null,
                }
            }) : [{
                type: 'line',
                data: yData,
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
