import CardWidgetSchema from './CardWidgetSchema';
import MemoWidgetSchema from './MemoWidgetSchema';
import { WidgetFormSchema } from '../SchemaUtil';
import { GridWidgetType } from '../../type';

const GridWidgetSchema: { [K in GridWidgetType]?: WidgetFormSchema } = {
    memo: MemoWidgetSchema,
    card: CardWidgetSchema,
};

export default GridWidgetSchema;
