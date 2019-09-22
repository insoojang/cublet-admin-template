import i18next from 'i18next';

import { createWidgetFormSchema } from '../SchemaUtil';
import { GeneralSchema, MemoSchema } from '..';

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
