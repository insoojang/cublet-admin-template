import React from 'react';
import { Layout } from 'antd';

interface IProps {
    title?: React.ReactNode;
    titleText?: React.ReactNode;
    titleAction?: React.ReactNode;
    content?: React.ReactNode;
}

const Content: React.SFC<IProps> = (props) => {
    const {
        title,
        titleText,
        titleAction,
        content,
        children,
    } = props;
    return (
        <Layout.Content className="gyul-content">
            {(title || titleText || titleAction) && (
                <div className="gyul-content-title">
                    {
                        title || (
                            <>
                                <div className="gyul-content-title-text">
                                    {titleText}
                                </div>
                                <div className="gyul-content-title-action">
                                    {titleAction}
                                </div>
                            </>
                        )
                    }
                </div>
            )}
            <div className="gyul-content-container">
                {content || children}
            </div>
        </Layout.Content>
    )
}

export default Content;
