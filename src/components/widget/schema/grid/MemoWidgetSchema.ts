import i18next from 'i18next';

import { createWidgetFormSchema } from '../../../../utils';
import { GeneralSchema, MemoSchema } from '../form';

const MemoWidgetSchema = createWidgetFormSchema({
    general: {
        title: i18next.t('common.general'),
        schema: GeneralSchema,
    },
    memo: {
        title: i18next.t('widget.memo.title'),
        schema: MemoSchema,
    },
});

export default MemoWidgetSchema;
