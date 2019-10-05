import React, { Component } from 'react';
import i18next from 'i18next';

import AdminFormContainer from './AdminFormContainer';
import { Form } from '../form';
import { Content } from '../layout';
import { Dial } from '../dial';

class SMSNotification extends Component {
    render() {
        return (
            <Content
                scroll={false}
                action={<Dial icon="save" cancelIcon="save" />}
            >
                <AdminFormContainer
                    message={i18next.t('sms-notification.description')}
                >
                    <Form
                        formSchema={{
                            jdbcDriver: {
                                type: 'text',
                                label: i18next.t('sms-notification.jdbc-driver.title'),
                                description: i18next.t('sms-notification.jdbc-driver.description'),
                                required: true,
                            },
                            jdbcURL: {
                                type: 'text',
                                label: i18next.t('sms-notification.jdbc-url.title'),
                                description: i18next.t('sms-notification.jdbc-url.description'),
                                required: true,
                            },
                            dbUser: {
                                type: 'text',
                                label: i18next.t('sms-notification.db-user.title'),
                                description: i18next.t('sms-notification.db-user.description'),
                                required: true,
                            },
                            dbPassword: {
                                type: 'password',
                                label: i18next.t('sms-notification.db-password.title'),
                                description: i18next.t('sms-notification.db-password.description'),
                            },
                            senderNumber: {
                                type: 'text',
                                label: i18next.t('sms-notification.sender-number.title'),
                                description: i18next.t('sms-notification.sender-number.description'),
                                required: true,
                            },
                            insertSQL: {
                                type: 'textarea',
                                label: i18next.t('sms-notification.insert-sql.title'),
                                description: i18next.t('sms-notification.insert-sql.description'),
                                required: true,
                            },
                            limitMessage: {
                                type: 'number',
                                label: i18next.t('sms-notification.limit-message.title'),
                                description: i18next.t('sms-notification.limit-message.description'),
                                required: true,
                                initialValue: 70,
                                span: 12,
                            },
                            enabled: {
                                type: 'boolean',
                                label: i18next.t('sms-notification.enabled.title'),
                                description: i18next.t('sms-notification.enabled.description'),
                                span: 12,
                            },
                        }}
                    />
                </AdminFormContainer>
            </Content>
        )
    }
}

export default SMSNotification;
