import i18next from 'i18next';

import { createFormSchema } from '../../../../utils';

const MemoSchema = createFormSchema({
    html: {
        type: 'boolean',
        required: true,
        span: 4,
        label: i18next.t('widget.memo.html'),
    },
    value: {
        type: 'textarea',
        required: true,
        label: i18next.t('common.value'),
    },
});

export default MemoSchema;
