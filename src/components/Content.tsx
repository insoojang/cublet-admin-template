import React, { Component } from 'react';
import { Layout, Tree, Icon } from 'antd';

class Content extends Component {
    render() {
        return (
            <Layout.Content className="gyul-content">
                <div className="gyul-content-title">
                    <div>
                        Content title
                    </div>
                </div>
                <div className="gyul-content-container">
                    <div className="gyul-tree-container">
                        <Tree
                            className="gyul-tree"
                            showIcon
                            defaultExpandAll
                            defaultSelectedKeys={['0-0-0']}
                            switcherIcon={<Icon type="down" />}
                        >
                            <Tree.TreeNode icon={<Icon type="smile-o" />} title="parent 1" key="0-0">
                            <Tree.TreeNode icon={<Icon type="meh-o" />} title="leaf" key="0-0-0" />
                            <Tree.TreeNode
                                icon={({ selected }) => <Icon type={selected ? 'frown' : 'frown-o'} />}
                                title="leaf"
                                key="0-0-1"
                            />
                            </Tree.TreeNode>
                        </Tree>
                    </div>
                </div>
            </Layout.Content>
        )
    }
}
export default Content;
