import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';

import { Layout, Breadcrumb } from 'antd';

import './index.css';
import { AllHeader } from '../../components/header'
import UserMenu from '../../components/user_menu'
import UserInfo from '../../components/user_info'
import UserCreate from '../../components/user_create'
import UserChangeMount from '../../components/user_change'


const { Content } = Layout;


export default function UserPage() {
    let { url } = useRouteMatch();

    return (
        <Layout>
            <AllHeader number={'2'} />
            <Layout>
                <Switch>
                    <Route exact path={`${url}`}>
                        <UserMenu selectOptins='1' url={url} />
                    </Route>
                    <Route exact path={`${url}/creat`}>
                        <UserMenu selectOptins='2' url={url} />
                    </Route>
                    <Route exact path={`${url}/change`}>
                        <UserMenu selectOptins='3' url={url} />
                    </Route>
                </Switch>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Switch>
                        <Route exact path={`${url}`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>用户一览</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <UserInfo />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/creat`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>用户创建</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <UserCreate />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/change`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>修改用户信息</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                <UserChangeMount />
                            </Content>
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}