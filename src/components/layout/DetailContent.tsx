import React from 'react';

const DetailContent: React.SFC = props => {
    const {
        children,
        ...other
    } = props;
    return (
        <div {...other} className="cublet-detail-content">
            {children}
        </div>
    );
}

export default DetailContent;
