import React from 'react';
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default function UserMenu(props) {

    return (
        <div>
            <UserMenuFunc {...props} />
        </div>
    );
}


class UserMenuFunc extends React.Component {


    render() {
        return (
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={this.props.selectOptins}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="back">
                        <ArrowLeftOutlined style={{ fontSize: '21px' }} />
                        <Link to={`/`}>回到主页</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <UserOutlined style={{ fontSize: '21px' }} />
                                用户管理
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to={this.props.url}>用户列表</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`${this.props.url}/creat`}>创建新用户</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}