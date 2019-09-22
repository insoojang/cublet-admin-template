import i18next from 'i18next';

import { createFormSchema } from './SchemaUtil';

const GeneralSchema = createFormSchema({
    title: {
        type: 'text',
        label: i18next.t('common.title'),
        required: true,
    },
    description: {
        type: 'textarea',
        label: i18next.t('common.description'),
    },
});

export default GeneralSchema;
