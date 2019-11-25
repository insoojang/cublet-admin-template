import React, { Component } from 'react';
import { Button, Input } from 'antd';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WrappedFormUtils } from 'antd/lib/form/Form';

import { Form } from '../form';
import { Authentication } from '../../redux/actions';
import { RootReducer } from '../../redux/reducers';
import { Redirect } from 'react-router';

const mapStateToProps = (state: RootReducer) => ({
    measurement: state.websocket.subscriptions.measurement,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    login: Authentication.Actions.login,
    validateJwtToken: Authentication.Actions.validateJwtToken,
}, dispatch);

type IProps = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

interface IState {
    isLoggedIn?: boolean;
}

class Login extends Component<IProps, IState> {
    private form: WrappedFormUtils;
    private inputUserId: HTMLInputElement;
    private inputPassword: HTMLInputElement;

    state: IState = {
        isLoggedIn: false,
    }

    async componentDidMount() {
        try {
            await this.props.validateJwtToken();
            this.setState({
                isLoggedIn: true,
            });
        } catch (error) {
            this.setState({
                isLoggedIn: false,
            });
        }
    }

    handleLogin = () => {
        this.form.validateFields(async (err, values) => {
            if (err) {
                if (err.userId) {
                    this.inputUserId.focus();
                } else {
                    this.inputPassword.focus();
                }
                return;
            }
            const { userId, password } = values;
            try {
                await this.props.login(userId, password);
                this.setState({
                    isLoggedIn: true,
                });
            } catch (error) {
                this.setState({
                    isLoggedIn: false,
                });
            }
        });
    }

    render() {
        const { isLoggedIn } = this.state;
        if (isLoggedIn) {
            return <Redirect to="/dashboard" />;
        }
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
                    <Form
                        ref={(c: any) => { this.form = c; }}
                        render={form => {
                            return (
                                <>
                                    <div className="cublet-login-right-username">
                                        <Form.Item label={i18next.t('common.user-id')}>
                                            {
                                                form.getFieldDecorator('userId', {
                                                    initialValue: '',
                                                    rules: [
                                                        { whitespace: false, min: 0, required: true },
                                                    ],
                                                })(<Input ref={(c: any) => { this.inputUserId = c; }} onPressEnter={this.handleLogin} />)
                                            }
                                        </Form.Item>
                                    </div>
                                    <div className="cublet-login-right-password">
                                        <Form.Item label={i18next.t('common.password')}>
                                            {
                                                form.getFieldDecorator('password', {
                                                    initialValue: '',
                                                    rules: [
                                                        { whitespace: false, min: 0, required: true },
                                                    ],
                                                })(<Input.Password ref={(c: any) => { this.inputPassword = c; }} onPressEnter={this.handleLogin} />)
                                            }
                                        </Form.Item>
                                    </div>
                                    <div className="cublet-login-right-actions">
                                        <Button type="primary" block={true} onClick={this.handleLogin}>
                                            {i18next.t('action.login')}
                                        </Button>
                                    </div>
                                </>
                            );
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
