import React, { Component } from 'react';

import { Content } from '../layout';
import i18next from 'i18next';

class Home extends Component {
    render() {
        return (
            <Content>
                {i18next.t('common.home')}
            </Content>
        )
    }
}
export default Home;
