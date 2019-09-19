import React from 'react';
import { Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';

interface IProps {
    status: number;
}

const ErrorPage: React.SFC<IProps> = props => {
    const { status } = props;
    return (
        <div className="gyul-error-container">
            <Result
                status={status.toString() as ResultStatusType}
                title={status}
                subTitle="Sorry, the page you visited does not exist."
            />
        </div>
    )
}

export default ErrorPage;
