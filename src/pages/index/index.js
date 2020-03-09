import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';

import { AllHeader } from '../../components/header'
import { IndexSider } from '../../components/index_menu'
import { ServerTable } from '../../components/server_table'
import { ContainerTable } from '../../components/container_table'
import { ContainerOne } from '../../components/container_info'
import { ImageTable } from '../../components/image_table'
import ContainerOneServer from '../../components/container_table/one_container_table'
import ContainerCreate from '../../components/container_create'
import ImageOneServer from '../../components/image_table/one_server_image'
import { NetworkTable } from '../../components/network_table'
import NetworkOneServer from '../../components/network_table/one_network'



const { Content } = Layout;


export default function Index() {
    let { url } = useRouteMatch();

    return (
        <Layout>
            <AllHeader number={'1'} />
            <Layout>
                <Switch>
                    <Route exact path={`${url}`}>
                        <IndexSider />
                    </Route>
                    <Route path={`${url}/serverinfo`}>
                        <IndexSider openKey='sub1' selectOptins='1' />
                    </Route>
                    <Route path={`${url}/server_secret`}>
                        <IndexSider openKey='sub1' selectOptins='2' />
                    </Route>
                    <Route path={`${url}/containerinfo`}>
                        <IndexSider openKey='sub2' selectOptins='5' />
                    </Route>
                    <Route path={`${url}/image`}>
                        <IndexSider openKey='sub4' selectOptins='9' />
                    </Route>
                    <Route path={`${url}/network`}>
                        <IndexSider openKey='sub5' selectOptins='10' />
                    </Route>
                </Switch>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Switch>
                        <Route exact path={`${url}`}>
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
                                <div>aaaa</div>
                            </Content>
                        </Route>
                        <Route path={`${url}/serverinfo`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>集群信息</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ServerTable />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/containerinfo`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ContainerTable />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/containerinfo/:server_ip`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                        <Route path={`${url}/containerinfo/:server_ip/create`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                        <Route path={`${url}/containerinfo/:server_ip/info/:id`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                        <Route exact path={`${url}/image`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <ImageTable />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/image/:server_ip`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                        <Route exact path={`${url}/network`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <NetworkTable />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/network/:server_ip`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}