import React from 'react';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';

interface IProps {
    language?: string;
}

const locales: { [key: string]: any } = {
    'ko': koKR,
    'ko-KR': koKR,
    'en': enUS,
    'en-US': enUS,
};

const LocaleContainer: React.SFC<IProps> = props => {
    const { children, language } = props;
    return (
        <ConfigProvider locale={locales[language]}>
            {children}
        </ConfigProvider>
    );
}

export default LocaleContainer;
