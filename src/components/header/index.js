import React from 'react';
import {
    Link,
} from "react-router-dom";
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu, } from 'antd';


const { Header, } = Layout;

export class AllHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            show_number: props.number
        }
    }

    render() {
        return (
            <Header className="header">
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[this.state.show_number]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/">功能操作</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/user">用户管理</Link>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}