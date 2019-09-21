import { FormSchema } from '../../form/Form';

const GeneralSchema: FormSchema = {
    title: {
        type: 'text',
        label: 'Title',
        required: true,
    },
    description: {
        type: 'text',
        label: 'Description',
    },
};

export default GeneralSchema;
