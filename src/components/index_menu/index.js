import React from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined, SettingOutlined,EyeOutlined } from '@ant-design/icons';
import { Layout, Menu, } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;



export class IndexSider extends React.Component {
    // submenu keys of first level

    constructor(props) {
        super(props);
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5'];
        this.state = {
            openKeys: [this.props.openKey],
            openOptions: [this.props.selectOptins],
        };
    }




    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    render() {
        return (
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultOpenKeys={this.state.openKeys}
                    defaultSelectedKeys={this.state.openOptions}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 200 }}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
                >
                    <Menu.Item key="0">
                        <EyeOutlined />
                        <Link to={`/control/${this.props.server_ip}`}>全局总览</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <MailOutlined />
                                <span>集群管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to={`/control/${this.props.server_ip}/serverinfo`}>集群总览</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`/control/${this.props.server_ip}/server_secret`}>集群密钥管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <AppstoreOutlined />
                                <span>容器管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to={`/control/${this.props.server_ip}/containerinfo`}>容器总览</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <SettingOutlined />
                                <span>镜像管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">
                            <Link to={`/control/${this.props.server_ip}/image`}>镜像列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={
                            <span>
                                <SettingOutlined />
                                <span>网络管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="10">
                            <Link to={`/control/${this.props.server_ip}/network`}>网卡一览</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default function IndexMenu(props) {
    let { server_ip } = useParams();

    return (<IndexSider server_ip={server_ip} openKey={props.openKey} selectOptins={props.selectOptins} />)
}