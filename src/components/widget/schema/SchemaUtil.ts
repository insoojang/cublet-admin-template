import { FormSchema } from '../../form/Form';

export interface IWidgetSchema {
    [key: string]: WidgetFormSchema;
}

export interface WidgetFormSchema {
    [key: string]: {
        title?: string;
        schema: FormSchema;
    };
}

export const createWidgetFormSchema = (widgetFormSchema: WidgetFormSchema) => widgetFormSchema;

export const createFormSchema = (formSchema: FormSchema) => formSchema;
