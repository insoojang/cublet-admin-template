import i18next from 'i18next';

import { GeneralSchema } from '../form';
import { createWidgetFormSchema } from '../../../../utils';

const AreaChartWidgetSchema = createWidgetFormSchema({
    general: {
        title: i18next.t('common.general'),
        schema: GeneralSchema,
    },
});

export default AreaChartWidgetSchema;
