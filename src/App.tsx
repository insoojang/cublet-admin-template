import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from 'antd';

import './styles/index.less';
import Content from './components/Content';
import Header from './components/Header';
import Sider from './components/Sider';

class App extends Component {
    render() {
        return (
            <Layout className="gyul-app-container">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="Gyul Admin Template" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css" />
                </Helmet>
                <Sider />
                <Layout>
                    <Header />
                    <Content />
                </Layout>
            </Layout>
        )
    }
}
export default App;
