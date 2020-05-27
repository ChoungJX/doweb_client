import { ApartmentOutlined, AppstoreOutlined, ArrowLeftOutlined, CloudServerOutlined, DashboardOutlined, FolderOpenOutlined, SaveOutlined } from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link, useParams } from "react-router-dom";

const { SubMenu } = Menu;
const { Sider } = Layout;
const { error } = Modal;



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
                    defaultSelectedKeys={this.state.openOptions}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 200 }}
                    defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6']}
                >
                    <Menu.Item key="back">
                        <ArrowLeftOutlined style={{ fontSize: '21px' }} />
                        <Link to={`/`}>回到主页</Link>
                    </Menu.Item>
                    <Menu.Item key="0">
                        <DashboardOutlined style={{ fontSize: '21px' }} />
                        <Link to={`/control/${this.props.server_id}`}>Dashboard</Link>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <CloudServerOutlined style={{ fontSize: '21px' }} />
                                <span>服务器管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="1">
                            <Link to={`/control/${this.props.server_id}/serverinfo`}>服务器总览</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={`/control/${this.props.server_id}/server_secret`}>服务器密钥管理</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <AppstoreOutlined style={{ fontSize: '21px' }} />
                                <span>容器管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">
                            <Link to={`/control/${this.props.server_id}/containerinfo`}>容器总览</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <SaveOutlined style={{ fontSize: '21px' }} />
                                <span>镜像管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">
                            <Link to={`/control/${this.props.server_id}/image`}>镜像列表</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub5"
                        title={
                            <span>
                                <ApartmentOutlined style={{ fontSize: '21px' }} />
                                <span>网络管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="10">
                            <Link to={`/control/${this.props.server_id}/network`}>网卡一览</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub6"
                        title={
                            <span>
                                <FolderOpenOutlined style={{ fontSize: '21px' }} />
                                <span>卷管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="11">
                            <Link to={`/control/${this.props.server_id}/volume`}>卷一览</Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default function IndexMenu(props) {
    let { server_id } = useParams();
    axios.post('/api',
        {
            api: 'server_check',
            server_id: server_id,
        }).then(d2 => {
            if (d2.data.status === 0) {

            } else if (d2.data.status === -666) {
                error({
                    title: '错误：登录已经失效！',
                    content: '请重新登录！',
                    onOk() {
                        window.location.replace("/")
                    },
                });
            } else {
                error({
                    title: '错误：与目标服务器连接失败！',
                    content: '可能该服务器已经离线或是您输入了一个错误的服务器ID。',
                    onOk() {
                        window.location.replace("/")
                    },
                });
            }
        }).catch(err => {
            error({
                title: '错误：与目标服务器连接失败！',
                content: '可能该服务器已经离线或是您输入了一个错误的服务器ID。',
                onOk() {
                    window.location.replace("/")
                },
            });
        });

    return (<IndexSider server_id={server_id} openKey={props.openKey} selectOptins={props.selectOptins} />)
}