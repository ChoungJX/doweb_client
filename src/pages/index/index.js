import React from 'react';
import {
  Link,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Breadcrumb, } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import { ServerTable } from '../../components/server_table';
import { ContainerTable } from '../../components/container_table'
import { IndexSider } from '../../components/index_menu'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Index extends React.Component{

  render(){
    return(
      <Layout>
        <Header className="header">
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">
                    <Link to="/">功能</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/user">用户</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/login">登录</Link>
                </Menu.Item>
            </Menu>
        </Header>
        <IndexSider />
        <ServerTable />
      </Layout>
    )
  }
}