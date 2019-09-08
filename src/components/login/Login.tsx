import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="gyul-login">
                <div className="gyul-login-left">
                    <div className="gyul-login-left-header">
                        <div className="gyul-login-left-logo">
                            Smart Home
                        </div>
                    </div>
                    <div className="gyul-login-left-content">
                        <p className="text-1">
                            Control Your home
                        </p>
                        <p className="text-2">
                            Connect your life
                        </p>
                    </div>
                    <div className="gyul-login-left-footer">

                    </div>
                </div>
                <div className="gyul-login-right">
                    Login Right
                </div>
            </div>
        )
    }
}
export default Login;
