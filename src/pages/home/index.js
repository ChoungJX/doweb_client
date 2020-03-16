import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Divider, Col, Row, Card,Alert } from 'antd';
import './index.css';
import { AllHeader } from '../../components/header'

import ServerTableHook from '../../components/server_table'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    render() {
        const { Header, Content, Footer } = Layout;
        const { Meta } = Card;
        const { loading } = this.state;
        return (
            <Layout className="layout">
                <Header>
                    <AllHeader number={'1'} />
                </Header>
                <Content style={{ padding: '0 50px' }} className="site-layout-background">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                    </Breadcrumb>
                    <Divider orientation="left">系统公告</Divider>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={24} >
                            <Alert
                                message="欢迎来到Docker容器可视化平台"
                                description="请选择一个服务器来进行操作。您也可以添加新的服务器或者删除一个服务器"
                                type="info"
                                showIcon
                            />
                        </Col>
                    </Row>
                    <Divider orientation="left">进入服务器</Divider>
                    <ServerTableHook />
                    <Divider />
                </Content>
                <Footer style={{ textAlign: 'center' }}>~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</Footer>
            </Layout>
        )
    }
}