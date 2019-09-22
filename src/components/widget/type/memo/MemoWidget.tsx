import React, { Component } from 'react';
import escape from 'lodash/escape';

import { WidgetProps } from '../../Widget';

class MemoWidget extends Component<WidgetProps> {
    render() {
        const { properties } = this.props.widget;
        const { memo = { html: true, value: '' } } = properties;
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: memo.html ? memo.value as string : escape(memo.value as string),
                }}
            />
        )
    }
}

export default MemoWidget;
