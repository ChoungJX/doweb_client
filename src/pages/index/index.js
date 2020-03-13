import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Breadcrumb } from 'antd';

import { AllHeader } from '../../components/header'
import IndexMenu from '../../components/index_menu'
import { ServerTable } from '../../components/server_table'
import { ContainerTable } from '../../components/container_table'
import { ContainerOne } from '../../components/container_info'
import { ImageTable } from '../../components/image_table'
import ContainerOneServer from '../../components/container_table/one_container_table'
import ContainerCreate from '../../components/container_create'
import ImageOneServer from '../../components/image_table/one_server_image'
import { NetworkTable } from '../../components/network_table'
import NetworkOneServer from '../../components/network_table/one_network'
import NetworkCreate from '../../components/network_create'



const { Content } = Layout;


export default function Index() {
    let { url } = useRouteMatch();

    return (
        <Layout>
            <AllHeader number={'1'} />
            <Layout>
                <Switch>
                    <Route path={`${url}/:server_ip`}>
                        <IndexMenu />
                    </Route>
                    <Route path={`${url}/:server_ip/serverinfo`}>
                        <IndexMenu openKey='sub1' selectOptins='1' />
                    </Route>
                    <Route path={`${url}/:server_ip/server_secret`}>
                        <IndexMenu openKey='sub1' selectOptins='2' />
                    </Route>
                    <Route path={`${url}/:server_ip/containerinfo`}>
                        <IndexMenu openKey='sub2' selectOptins='5' />
                    </Route>
                    <Route path={`${url}/:server_ip/image`}>
                        <IndexMenu openKey='sub4' selectOptins='9' />
                    </Route>
                    <Route path={`${url}/:server_ip/network`}>
                        <IndexMenu openKey='sub5' selectOptins='10' />
                    </Route>
                </Switch>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Switch>
                        <Route exact path={`${url}/:server_ip`}>
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
                        
                        
                        <Route exact path={`${url}/:server_ip/containerinfo`}>
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
                        <Route path={`${url}/:server_ip/containerinfo/create`}>
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
                        <Route path={`${url}/:server_ip/containerinfo/info/:id`}>
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
                        <Route exact path={`${url}/:server_ip/image`}>
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
                        <Route exact path={`${url}/:server_ip/network`}>
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
                        <Route exact path={`${url}/:server_ip/network/create`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>主页</Breadcrumb.Item>
                                <Breadcrumb.Item>选择服务器</Breadcrumb.Item>
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
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}