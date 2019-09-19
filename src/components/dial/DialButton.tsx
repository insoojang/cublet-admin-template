import React from 'react';
import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';

export interface DialButtonProps extends ButtonProps {
    icon: string;
}

const DialButton: React.SFC<DialButtonProps> = props => {
    const {
        icon,
        ...other
    } = props;
    return (
        <Button icon={icon} size="large" shape="circle" {...other} />
    )
}

export default DialButton;
