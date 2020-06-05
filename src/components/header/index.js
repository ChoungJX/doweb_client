import React from 'react';
import {
    Link,
} from "react-router-dom";

import './index.css';
import { Layout, Menu, Row, Col, Dropdown, Avatar, message, Button } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, } = Layout;


export class AllHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            ifadmin: "0"
        }
    }

    componentDidMount() {
        this.fetch();
    }

    logout() {
        axios.post('/api',
            {
                api: 'logout',

            }).then(data => {
                window.location.reload();
                message.info("登出成功！");
            });
    }

    fetch() {
        axios.post('/api',
            {
                api: 'check_login',

            }).then(data => {
                this.setState({
                    username: data.data.username,
                    ifadmin: data.data.ifadmin
                })
            });
    }

    render() {
        const { username, ifadmin } = this.state
        return (
            <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="logo" />
                <Row justify="space-between">
                    <Col>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[this.props.number]}
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1">
                                <Link to="/">功能操作</Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/user">用户管理</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/about">关于</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col>
                        <div align="right">
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item>
                                        身份: {ifadmin === "100" ? "管理员" : ifadmin === "-1" ? "游客" : "普通用户"}
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item>
                                        <div align="center" onClick={() => this.logout()}>
                                            登出
                                    </div>
                                    </Menu.Item>
                                </Menu>
                            }>
                                <Button size="large" type="link">
                                    {username} <DownOutlined />
                                </Button>
                            </Dropdown>
                            <Avatar icon={<UserOutlined />} />
                        </div>
                    </Col>
                </Row>
            </Header>
        )
    }
}