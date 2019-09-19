import React from 'react';
import { Scrollbar } from '../../scrollbar';

interface IProps {
    content?: React.ReactNode;
    title?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
}

const Panel: React.SFC<IProps> = props => {
    const {
        title,
        content,
        titleStyle,
        contentStyle,
        children,
    } = props;
    return (
        <div className="gyul-monitoring-panel">
            {title && (<div className="gyul-monitoring-panel-header" style={titleStyle}>
                {title}
            </div>)}
            <Scrollbar>
                <div className="gyul-monitoring-panel-content" style={contentStyle}>
                    {children || content}
                </div>
            </Scrollbar>
        </div>
    )
}

export default Panel;
