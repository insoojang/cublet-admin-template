import React from 'react';

const DetailContent: React.SFC = props => {
    const {
        children,
        ...other
    } = props;
    return (
        <div {...other} className="gyul-detail-content">
            {children}
        </div>
    );
}

export default DetailContent;
