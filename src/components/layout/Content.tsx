import React from 'react';
import { Layout } from 'antd';
import classnames from 'classnames';

import { Scrollbar } from '../scrollbar';

interface IProps {
    title?: React.ReactNode;
    titleText?: React.ReactNode;
    titleAction?: React.ReactNode;
    content?: React.ReactNode;
    extraContent?: React.ReactNode;
    scroll?: boolean;
    action?: React.ReactNode;
    className?: string;
}

const Content: React.SFC<IProps> = props => {
    const {
        title,
        titleText,
        titleAction,
        content,
        extraContent,
        children,
        scroll,
        action,
        className,
    } = props;
    return (
        <Layout.Content className="cublet-content">
            {(title || titleText || titleAction) && (
                <div className="cublet-content-title">
                    {
                        title || (
                            <>
                                <div className="cublet-content-title-text">
                                    {titleText}
                                </div>
                                <div className="cublet-content-title-action">
                                    {titleAction}
                                </div>
                            </>
                        )
                    }
                </div>
            )}
            <div className={classnames('cublet-content-container', className)}>
                {scroll ? (
                    <Scrollbar>
                        {content || children}
                    </Scrollbar>
                ) : content || children}
                {extraContent}
            </div>
            <div className="cublet-content-action">
                {action}
            </div>
        </Layout.Content>
    )
}

Content.defaultProps = {
    scroll: true,
};

export default Content;
