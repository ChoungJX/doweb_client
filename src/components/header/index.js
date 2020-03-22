import React from 'react';
import {
    Link,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, Row, Col, Dropdown, Avatar, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header, } = Layout;


export class AllHeader extends React.Component {
    constructor(props) {
        super(props);
        this.menu = (
            <Menu>
                <Menu.Item>
                    <div onClick={() => this.logout()}>
                        登出
                    </div>
                </Menu.Item>
            </Menu>
        )
        this.state = {
            username: ""
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
                message.info("登出成功！");
                window.location.reload();
            });
    }

    fetch() {
        axios.post('/api',
            {
                api: 'check_login',

            }).then(data => {
                this.setState({
                    username: data.data.username,
                })
            });
    }

    render() {
        const { username } = this.state;
        return (
            <Header className="header">
                <div className="logo" />
                <Row>
                    <Col span={21}>
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
                        </Menu>
                    </Col>
                    <Col>
                        <Dropdown overlay={this.menu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {username} <DownOutlined />
                            </a>
                        </Dropdown>
                        <span>|</span>
                        <Avatar icon={<UserOutlined />} />
                    </Col>
                </Row>
            </Header>
        )
    }
}