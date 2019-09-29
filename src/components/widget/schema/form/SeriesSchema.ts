import i18next from 'i18next';

import { createFormSchema } from '../../../../utils';

const SeriesSchema = createFormSchema({
    type: 'dynamic',
    header: i18next.t('widget.series.title'),
    forms: {
        type: {
            label: i18next.t('common.type'),
            type: 'select',
            initialValue: 'line',
            items: [
                {
                    label: i18next.t('chart.line'),
                    value: 'line',
                    forms: {
                        isArea: {
                            label: i18next.t('widget.line-chart.isArea'),
                            type: 'boolean',
                            initialValue: false,
                        },
                    },
                },
                {
                    label: i18next.t('chart.bar'),
                    value: 'bar',
                },
            ],
        },
        data: {
            label: i18next.t('common.data'),
            type: 'text',
            span: 12,
        },
    },
});

export default SeriesSchema;
