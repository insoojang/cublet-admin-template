import React, { Component } from 'react';
import { Tree, Icon, Input, Dropdown, Button, Menu } from 'antd';

class MonitoringTree extends Component {
    renderOverlayMenu = () => {
        return (
            <Menu>
                <Menu.SubMenu
                    title={
                        <>
                            <Icon type="plus" />
                            <span>Add</span>
                        </>
                    }
                >
                    <Menu.Item>
                        Leaf1
                    </Menu.Item>
                    <Menu.Item>
                        Leaf2
                    </Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>
                    <Icon type="delete" />
                    <span>Delete</span>
                </Menu.Item>
            </Menu>
        );
    }

    render() {
        return (
            <div className="cublet-tree-container">
                <div className="cublet-tree-toolbar">
                    <div className="cublet-tree-toolbar-search">
                        <Input.Search placeholder="Search for tree..." />
                    </div>
                    <div className="cublet-tree-toolbar-action">
                        <Dropdown overlay={this.renderOverlayMenu()} trigger={['click']}>
                            <Button icon="menu" />
                        </Dropdown>
                    </div>
                </div>
                <Tree
                    className="cublet-tree"
                    showIcon={true}
                    defaultExpandAll={true}
                    defaultSelectedKeys={['0-0-0']}
                    switcherIcon={<Icon type="down" />}
                    blockNode={true}
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
        )
    }
}
export default MonitoringTree;
