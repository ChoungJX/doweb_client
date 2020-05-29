import { ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';


const { SubMenu } = Menu;
const { Sider } = Layout;


export default function UserMenu(props) {

    return (
        <UserMenuFunc {...props} />
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
                        <Menu.Item key="3">
                            <Link to={`${this.props.url}/change`}>修改用户信息</Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to={`${this.props.url}/history`}>登录历史</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}