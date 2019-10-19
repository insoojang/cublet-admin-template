import React, { Component } from 'react';
import { Dialog } from '../../components/dialog';
import { Button } from 'antd';

class DialogExample extends Component {
    state = {
        visible: false,
    }

    render() {
        return (
            <div style={{ width: 600, height: 400, position: 'relative' }}>
                <Button onClick={() => this.setState({ visible: !this.state.visible })}>Open Dialog</Button>
                <Dialog
                    title={'test'}
                    visible={this.state.visible}
                    closable={true}
                    global={false}
                    onCancel={() => this.setState({ visible: false })}
                >
                    test
                </Dialog>
            </div>
        )
    }
}

export default DialogExample;
