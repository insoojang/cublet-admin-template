import { WidgetFormSchema } from '../../../../utils/SchemaUtil';
import { GridWidgetType } from '../../type';

import CardWidgetSchema from './CardWidgetSchema';
import MemoWidgetSchema from './MemoWidgetSchema';
import LineChartWidgetSchema from './LineChartWidgetSchema';
import PieChartWidgetSchema from './PieChartWidgetSchema';
import AreaChartWidgetSchema from './AreaChartWidgetSchema';

const GridWidgetSchema: { [K in GridWidgetType]?: WidgetFormSchema } = {
    'memo': MemoWidgetSchema,
    'card': CardWidgetSchema,
    'line-chart': LineChartWidgetSchema,
    'pie-chart': PieChartWidgetSchema,
    'area-chart': AreaChartWidgetSchema,
};

export default GridWidgetSchema;
