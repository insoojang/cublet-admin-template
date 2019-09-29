import i18next from 'i18next';

import { GeneralSchema, SeriesSchema, XAxisSchema, YAxisSchema } from '../form';
import { createWidgetFormSchema } from '../../../../utils';

const LineChartWidgetSchema = createWidgetFormSchema({
    general: {
        title: i18next.t('common.general'),
        schema: GeneralSchema,
    },
    series: {
        title: i18next.t('widget.series.title'),
        schema: SeriesSchema,
        isSingle: true,
    },
    xAxis: {
        title: i18next.t('widget.xaxis.title'),
        schema: XAxisSchema,
        isSingle: true,
    },
    yAxis: {
        title: i18next.t('widget.yaxis.title'),
        schema: YAxisSchema,
        isSingle: true,
    },
});

export default LineChartWidgetSchema;
