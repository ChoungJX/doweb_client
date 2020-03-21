import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';

import { AllHeader } from '../../components/header'
import IndexMenu from '../../components/index_menu'
import { ContainerOne } from '../../components/container_info'
import ContainerOneServer from '../../components/container_table/one_container_table'
import ContainerCreate from '../../components/container_create'
import ImageOneServer from '../../components/image_table/one_server_image'
import NetworkOneServer from '../../components/network_table/one_network'
import NetworkCreate from '../../components/network_create'
import IndexData from '../../components/index_data'
import ServerInfo from '../../components/server_info'
import ServerPsw from '../../components/server_psw'
import VolumeOneServer from '../../components/volume_table'



const { Content } = Layout;


export default function Index() {
    let { url } = useRouteMatch();

    return (
        <Layout>
            <AllHeader number={'1'} />
            <Layout>
                <Switch>
                    <Route exact path={`${url}/:server_id`}>
                        <IndexMenu selectOptins='0' />
                    </Route>
                    <Route path={`${url}/:server_id/serverinfo`}>
                        <IndexMenu openKey='sub1' selectOptins='1' />
                    </Route>
                    <Route path={`${url}/:server_id/server_secret`}>
                        <IndexMenu openKey='sub1' selectOptins='2' />
                    </Route>
                    <Route path={`${url}/:server_id/containerinfo`}>
                        <IndexMenu openKey='sub2' selectOptins='5' />
                    </Route>
                    <Route path={`${url}/:server_id/image`}>
                        <IndexMenu openKey='sub4' selectOptins='9' />
                    </Route>
                    <Route path={`${url}/:server_id/network`}>
                        <IndexMenu openKey='sub5' selectOptins='10' />
                    </Route>
                    <Route path={`${url}/:server_id/volume`}>
                        <IndexMenu openKey='sub6' selectOptins='11' />
                    </Route>
                </Switch>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Switch>
                        <Route exact path={`${url}/:server_id`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <IndexData />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/serverinfo`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>服务器信息</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ServerInfo />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/server_secret`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>服务器密钥</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ServerPsw />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/containerinfo`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>容器总览</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ContainerOneServer />
                            </Content>
                        </Route>
                        <Route path={`${url}/:server_id/containerinfo/create`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>容器创建</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ContainerCreate />
                            </Content>
                        </Route>
                        <Route path={`${url}/:server_id/containerinfo/info/:id`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>容器总览</Breadcrumb.Item>
                                <Breadcrumb.Item>容器详情</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ContainerOne />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/image`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>镜像一览</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ImageOneServer />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/network`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>网络总览</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <NetworkOneServer />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/network/create`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>创建新网络</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <NetworkCreate />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/:server_id/volume/`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>卷管理</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <VolumeOneServer />
                            </Content>
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}