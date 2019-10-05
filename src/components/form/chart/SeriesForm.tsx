import React, { Component } from 'react';
import i18next from 'i18next';

import { DynamicForm } from '..';
import { FormItemProps } from '../Form';

class SeriesForm extends Component<FormItemProps> {
    handleChange = (datas: any) => {
        this.props.onChange(datas);
    }

    render() {
        const { value } = this.props;
        return (
            <DynamicForm
                onChange={this.handleChange}
                value={value}
                label={i18next.t('widget.series.title')}
                formSchema={{
                    type: {
                        type: 'text',
                        span: 4,
                    },
                    type1: {
                        type: 'text',
                        span: 12,
                    },
                }}
            />
        );
    }
}

export default SeriesForm;
