import React, { Component } from 'react';
import uuid from 'uuid';

import { Form } from '../form';
import i18next from 'i18next';
import AdminFormContainer from './AdminFormContainer';

class SystemInfo extends Component {
    render() {
        return (
            <AdminFormContainer
                message={i18next.t('system-info.description')}
            >
                <Form
                    formSchema={{
                        systemId: {
                            type: 'text',
                            label: i18next.t('system-info.system-id'),
                            disabled: true,
                            initialValue: uuid(),
                        },
                    }}
                />
            </AdminFormContainer>
        )
    }
}

export default SystemInfo;
