import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Divider } from 'antd';
import './index.css';
import { AllHeader } from '../../components/header'

import { ServerTable } from '../../components/server_table'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { Header, Content, Footer } = Layout;
        return (
            <Layout className="layout">
                <Header>
                    <AllHeader number={'1'} />
                </Header>
                <Content style={{ padding: '0 50px' }} className="site-layout-background">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                    </Breadcrumb>
                    <Divider orientation="left">进入服务器</Divider>
                    <ServerTable />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}