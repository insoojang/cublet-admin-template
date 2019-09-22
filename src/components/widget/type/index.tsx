import * as chart from './chart';
import { MemoWidget } from './memo';
import { CardWidget } from './card';
import { IWidget } from '../Widget';

export type GridWidgetType = 'card'
| 'memo'
| 'chart-line'
| 'chart-area'
| 'chart-pie';

export type WidgetType = GridWidgetType;

const WidgetTypes = {
    'card': CardWidget,
    'memo': MemoWidget,
    'chart-line': chart.LineChartWidget,
    'chart-area': chart.AreaChartWidget,
    'chart-pie': chart.PieChartWidget,
} as { [K in WidgetType]: React.ComponentClass<{ widget: IWidget, [key: string]: any }> };

export default WidgetTypes;
