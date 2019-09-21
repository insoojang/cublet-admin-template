import { GeneralSchema } from '..';
import { WidgetFormSchema } from '.';

const CardWidgetSchema: WidgetFormSchema = {
    general: {
        title: 'General',
        schema: GeneralSchema,
    },
    metric: {
        title: 'Metric',
        schema: GeneralSchema,
    },
    style: {
        title: 'Style',
        schema: GeneralSchema,
    },
};

export default CardWidgetSchema;
