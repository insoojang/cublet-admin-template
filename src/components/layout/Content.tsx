import React from 'react';
import { Layout } from 'antd';

import { Scrollbar } from '../scrollbar';

interface IProps {
    title?: React.ReactNode;
    titleText?: React.ReactNode;
    titleAction?: React.ReactNode;
    content?: React.ReactNode;
    scroll?: boolean;
    action?: React.ReactNode;
}

const Content: React.SFC<IProps> = props => {
    const {
        title,
        titleText,
        titleAction,
        content,
        children,
        scroll,
        action,
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
                {scroll ? (
                    <Scrollbar>
                        {content || children}
                    </Scrollbar>
                ) : content || children}
            </div>
            <div className="gyul-content-action">
                {action}
            </div>
        </Layout.Content>
    )
}

Content.defaultProps = {
    scroll: true,
};

export default Content;
