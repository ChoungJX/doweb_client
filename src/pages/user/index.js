import { Breadcrumb, Layout } from 'antd';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { AllHeader } from '../../components/header';
import UserChangeMount from '../../components/user_change';
import UserCreate from '../../components/user_create';
import UserInfo from '../../components/user_info';
import UserLoginhistory from '../../components/user_loginhistory';
import UserMenu from '../../components/user_menu';
import './index.css';





const { Content } = Layout;


export default function UserPage() {
    let { url } = useRouteMatch();
    let screen_high = document.body.clientHeight;

    return (
        <Layout>
            <AllHeader number={'2'} />
            <Layout style={{ marginTop: 64 }}>
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
                    <Route exact path={`${url}/history`}>
                        <UserMenu selectOptins='4' url={url} />
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
                                    minHeight: screen_high - 64 - 48 - 32,
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
                                    minHeight: screen_high - 64 - 48 - 32,
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
                                    minHeight: screen_high - 64 - 48 - 32,
                                }}
                            >
                                <UserChangeMount />
                            </Content>
                        </Route>
                        <Route exact path={`${url}/history`}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>登录历史</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: screen_high - 64 - 48 - 32,
                                }}
                            >
                                <UserLoginhistory />
                            </Content>
                        </Route>
                    </Switch>
                </Layout>
            </Layout>
        </Layout>
    );
}