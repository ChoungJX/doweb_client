import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Divider, Col, Row, Skeleton, Switch, Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
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
                    <Divider orientation="left">系统总览</Divider>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={8} >
                            <center>
                                <Card
                                    style={{ marginTop: 16 }}
                                    actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Skeleton loading={loading} avatar active>
                                        <Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Skeleton>
                                </Card>
                            </center>
                        </Col>
                        <Col span={8} >
                            <center>
                                <Card
                                    style={{ marginTop: 16 }}
                                    actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Skeleton loading={loading} avatar active>
                                        <Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Skeleton>
                                </Card>
                            </center>
                        </Col>
                        <Col span={8} >
                            <center>
                                <Card
                                    style={{ marginTop: 16 }}
                                    actions={[
                                        <SettingOutlined key="setting" />,
                                        <EditOutlined key="edit" />,
                                        <EllipsisOutlined key="ellipsis" />,
                                    ]}
                                >
                                    <Skeleton loading={loading} avatar active>
                                        <Meta
                                            avatar={
                                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                            }
                                            title="Card title"
                                            description="This is the description"
                                        />
                                    </Skeleton>
                                </Card>
                            </center>
                        </Col>
                    </Row>
                    <Divider orientation="left">进入服务器</Divider>
                    <ServerTableHook />
                    <Divider />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}