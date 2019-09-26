import i18next from 'i18next';

import { GeneralSchema, CardStyleSchema } from '../form';
import { createWidgetFormSchema } from '../../../../utils';

const CardWidgetSchema = createWidgetFormSchema({
    general: {
        title: i18next.t('common.general'),
        schema: GeneralSchema,
    },
    type: {
        title: i18next.t('widget.card.type'),
        schema: CardStyleSchema,
    },
});

export default CardWidgetSchema;
