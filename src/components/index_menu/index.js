import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, Breadcrumb, } from 'antd';

const { SubMenu } = Menu;
const {  Sider } = Layout;



export class IndexSider extends React.Component {
  // submenu keys of first level

    constructor(props){
      super(props);
      this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4'];
      this.state = {
        openKeys: [this.props. openKey],
        openOptions: [this.props.selectOptins],
      };
    }

  


  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
        <Sider width={200} className="site-layout-background">
        <Menu
            mode="inline"
            defaultOpenKeys={this.state.openKeys}
            defaultSelectedKeys={this.state.openOptions}
            onOpenChange={this.onOpenChange}
            style={{ width: 200 }}
            >
                <SubMenu
                key="sub1"
                title={
                    <span>
                    <MailOutlined />
                    <span>集群管理</span>
                    </span>
                }
                >
                <Menu.Item key="1">
                    <Link to='/control/serverinfo'>集群总览</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to='/test'>集群密钥管理</Link>
                </Menu.Item>
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu
                key="sub2"
                title={
                    <span>
                    <AppstoreOutlined />
                    <span>容器管理</span>
                    </span>
                }
                >
                <Menu.Item key="5">
                  <Link to='/control/containerinfo'>容器总览</Link>
                </Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
                </SubMenu>
                <SubMenu
                key="sub4"
                title={
                    <span>
                    <SettingOutlined />
                    <span>Navigation Three</span>
                    </span>
                }
                >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    );
  }
}