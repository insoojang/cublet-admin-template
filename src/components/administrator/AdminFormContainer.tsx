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
            <div className="cublet-admin-form">
                <div className="cublet-admin-form-header">
                    <Alert {...other} />
                </div>
                <div className="cublet-admin-form-content">
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
