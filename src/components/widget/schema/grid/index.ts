import CardWidgetSchema from './CardWidgetSchema';
import { FormSchema } from '../../../form/Form';

export interface WidgetFormSchema {
    [key: string]: {
        title?: string;
        schema: FormSchema;
    };
}

const GridWidgetSchema: { [key: string]: WidgetFormSchema } = {
    card: CardWidgetSchema,
};

export default GridWidgetSchema;
