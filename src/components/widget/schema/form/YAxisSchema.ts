import { createFormSchema } from '../../../../utils';
import { YAxisForm } from '../../../chart';

const YAxisSchema = createFormSchema({
    yAxis: {
        type: 'custom',
        component: YAxisForm,
    },
});

export default YAxisSchema;
