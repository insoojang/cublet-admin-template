import React, { Component } from 'react';
import { Button, Input } from 'antd';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form } from '../form';
import { Authentication, WhiteLabel } from '../../redux/actions';

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    login: Authentication.Actions.login,
}, dispatch);

type IProps = ReturnType<typeof mapDispatchToProps>;

interface IState {
    userId: string;
    password: string;
}

class Login extends Component<IProps, IState> {
    state: IState = {
        userId: '',
        password: '',
    }

    handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userId: e.target.value,
        });
    }

    handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: e.target.value,
        });
    }

    handleLogin = async () => {
        const { userId, password } = this.state;
        try {
            const response = await this.props.login(userId, password);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        const { userId, password } = this.state;
        return (
            <div className="cublet-login">
                <div className="cublet-login-left">
                    <div className="cublet-login-left-header">
                        <div className="cublet-login-left-logo">
                            Smart Home
                        </div>
                    </div>
                    <div className="cublet-login-left-content">
                        <p className="text-1">
                            Control Your home
                        </p>
                        <p className="text-2">
                            Connect your life
                        </p>
                    </div>
                    <div className="cublet-login-left-footer">

                    </div>
                </div>
                <div className="cublet-login-right">
                    <div className="cublet-login-right-logo">
                        <img alt="" />
                    </div>
                    <div className="cublet-login-right-username">
                        <Form.Item label={i18next.t('common.user-id')} colon={false}>
                            <Input value={userId} onChange={this.handleUserId} />
                        </Form.Item>
                    </div>
                    <div className="cublet-login-right-password">
                        <Form.Item label={i18next.t('common.password')} colon={false}>
                            <Input type="password" value={password} onChange={this.handlePassword} />
                        </Form.Item>
                    </div>
                    <div className="cublet-login-right-actions">
                        <Button type="primary" block={true} onClick={this.handleLogin}>
                            {i18next.t('action.login')}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Login);
