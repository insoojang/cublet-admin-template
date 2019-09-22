import i18next from 'i18next';
import { createFormSchema } from './SchemaUtil';

const CardStyleSchema = createFormSchema({
    type: {
        type: 'select',
        items: [
            {
                label: i18next.t('common.value'),
                value: 'value',
            },
            {
                label: i18next.t('common.gauge'),
                value: 'gauge',
            },
        ],
        initialValue: 'value',
    },
});

export default CardStyleSchema;
