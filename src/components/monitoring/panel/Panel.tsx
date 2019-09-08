import React from 'react';

interface IProps {
    content?: React.ReactNode;
    title?: React.ReactNode;
    scroll?: boolean;
}

const Panel: React.SFC<IProps> = props => {
    const {
        title,
        content,
        children,
    } = props;
    return (
        <div className="gyul-monitoring-panel">
            {title && (<div className="gyul-monitoring-panel-header">
                {title}
            </div>)}
            <div className="gyul-monitoring-panel-content">
                {children || content}
            </div>
        </div>
    )
}

export default Panel;
