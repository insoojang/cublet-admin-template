import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import cloneDeep from 'lodash/cloneDeep';

import { createChartOption } from '../../../utils';
import { TimeseriesSimulator } from '../../../simulators';

interface IProps {

}

interface IState {
    option: echarts.EChartOption;
}

class MetricChart extends Component<IProps, IState> {
    echarts: any;
    count = 51;
    interval: NodeJS.Timeout;
    timeseriesSimulator = new TimeseriesSimulator();

    state: IState = {
        option: createChartOption({
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: this.timeseriesSimulator.init().xData,
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#69e0c0',
                            }, {
                                offset: 1, color: '#43b5c9',
                            }],
                            global: false,
                        },
                        shadowBlur: 5,
                        shadowColor: '#37e4b6',
                        opacity: 1,
                    },
                },
            },
            yAxis: {
                axisTick: {
                    show: false,
                },
                axisLine: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: '#69e0c0',
                            }, {
                                offset: 1, color: '#43b5c9',
                            }],
                            global: false,
                        },
                        shadowBlur: 5,
                        shadowColor: '#37e4b6',
                        opacity: 1,
                    },
                },
            },
            grid: {
                bottom: 30,
                top: 10,
                right: 20,
                left: 30,
            },
            series: [
                {
                    type: 'line',
                    data: this.timeseriesSimulator.init().yData,
                },
            ],
        }),
    }

    componentDidMount() {
        this.interval = setInterval(this.fetchNewDate, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    fetchNewDate = () => {
        const option = cloneDeep(this.state.option); // immutable
        const data0 = option.series[0].data as any[];
        data0.shift();
        data0.push(this.timeseriesSimulator.random().yData);
        option.xAxis.data.shift();
        option.xAxis.data.push(this.timeseriesSimulator.random().xData);
        this.setState({
            option,
        });
        const chartInstance = this.echarts.getEchartsInstance() as echarts.ECharts;
    };

    render() {
        const { option } = this.state;
        return (
            <Card
                title={'Simulator'}
            >
                <ReactEcharts
                    ref={(c: any) => { this.echarts = c; }}
                    option={option}
                    style={{
                        height: 150,
                    }}
                />
            </Card>
        )
    }
}

export default MetricChart;
