import React, { Component } from 'react';
import { Alert, Card } from 'antd';
import { AlertProps } from 'antd/lib/alert';
import { Scrollbar } from '../scrollbar';

class AdminFormContainer extends Component<AlertProps> {
    render() {
        const {
            children,
            ...other
        } = this.props;
        return (
            <div className="gyul-admin-form">
                <div className="gyul-admin-form-header">
                    <Alert {...other} />
                </div>
                <div className="gyul-admin-form-content">
                    <Card>
                        <Scrollbar>
                            {children}
                        </Scrollbar>
                    </Card>
                </div>
            </div>
        )
    }
}

export default AdminFormContainer;
