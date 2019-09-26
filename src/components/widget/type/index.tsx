import * as chart from './chart';
import { MemoWidget } from './memo';
import { CardWidget } from './card';

export type GridWidgetType = 'card'
| 'memo'
| 'line-chart'
| 'area-chart'
| 'pie-chart';

export type WidgetType = GridWidgetType;

const WidgetTypes: { [K in WidgetType]: React.ComponentClass<any> } = {
    'card': CardWidget,
    'memo': MemoWidget,
    'line-chart': chart.LineChartWidget,
    'area-chart': chart.AreaChartWidget,
    'pie-chart': chart.PieChartWidget,
};

export default WidgetTypes;
