import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { PageHeader, Input, Form, Divider, Select, Button, message, notification, Tabs, Switch, Slider, InputNumber } from 'antd';
import { AppleOutlined, AndroidOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

import ContainerSearchImage from "./image_select"
import ContainerSearchNetwork from "./network_select"
import MultipleSwitch from './mutiple_switch'
import PortsChoose from './ports_choose'


function ContainerPageHeader() {
    let { server_ip } = useParams();

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="创建容器"
            subTitle={`服务器:${server_ip}`}
        >
        </PageHeader>
    );
}

class ContainerCreate_page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            container_name_input: "",
            image_name_input: "",
            ports: [],

            command_input: "",
            entrypotin_input: "",
            user_input: "",
            ifTty: false,
            ifInteractive: false,

            network_name_input: "",
            hostname: "",
            network_ip: "",

            env: [],
            label: [],
        }
    }

    // =======================获取输入=======================
    handleContainer_name_input(e) {
        this.setState({
            container_name_input: e.target.value
        })
    }

    handleImage_name_input(value) {
        this.setState({
            image_name_input: value.label[0]
        })
    }

    handlePorts(value) {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            temp_list = [...temp_list, JSON.parse(value[i])]
        }
        this.setState({
            ports: temp_list,
        })
    }

    handleCommand_input(e) {
        this.setState({
            command_input: e.target.value
        })
    }

    handleEntrypotin_input(e) {
        this.setState({
            entrypotin_input: e.target.value
        })
    }

    handleUser_input(e) {
        this.setState({
            user_input: e.target.value
        })
    }

    handleIfTty() {
        const { ifTty } = this.state;
        if (ifTty) {
            this.setState({
                ifTty: false
            })
        } else {
            this.setState({
                ifTty: true
            })
        }
    }

    handleIfInteractive() {
        const { ifInteractive } = this.state;
        if (ifInteractive) {
            this.setState({
                ifInteractive: false
            })
        } else {
            this.setState({
                ifInteractive: true
            })
        }
    }



    handleNetwork_name_input(value) {
        this.setState({
            network_name_input: value.label
        })
    }

    handleHostname(e) {
        this.setState({
            hostname: e.target.value
        })
    }

    handleNetwork_ip(e) {
        this.setState({
            network_ip: e.target.value
        })
    }

    handleEvn(value) {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            temp_list = [...temp_list, JSON.parse(value[i])]
        }
        this.setState({
            env: temp_list,
        })
    }

    handleLabel(value) {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            temp_list = [...temp_list, JSON.parse(value[i])]
        }
        this.setState({
            label: temp_list,
        })
    }

    test() {
        console.log(this.state);
    }
    // =======================================================

    async handle_send() {
        const {
            container_name_input,
            image_name_input,
            ports,
            command_input,
            entrypotin_input,
            user_input,
            ifTty,
            ifInteractive,
            network_name_input,
            hostname,
            network_ip,
            env,
            label
        } = this.state;

        if (image_name_input === "") {
            message.error('必要信息没有填写完整！');
            return;
        }
        message.loading({ content: '容器创建中', key: 'updatable', duration: 0 });
        await axios.post('/api',
            {
                api: 'container_add',
                server_ip: this.props.server_ip,
                image: image_name_input,
                name: container_name_input,
                connect_port: ports,
                cmd: command_input,
                entrypoint: entrypotin_input,
                user: user_input,
                Tty: ifTty,
                interactive: ifInteractive,

            }).then(data => {
                setTimeout(() => {
                    message.success({ content: '客户端已接收数据！', key: 'updatable', duration: 2 });
                }, 1000);
                console.log(data.data.data.data);
                if (!data.data.data.data.message) {
                    notification.open({
                        message: '创建成功！',
                        description:
                            `网络:${data.data.data.data.Id}创建成功！`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                    window.history.back();
                    return;
                }
                notification.open({
                    message: '创建失败！',
                    description:
                        `${data.data.data.data.message}`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            });
    }

    render() {
        const { TabPane } = Tabs;
        return (
            <div>
                <ContainerPageHeader />
                <Form>
                    <Form.Item
                        label="名字"
                        name="container_name"
                    >
                        <Input placeholder="为新容器起个名字吧~" style={{ width: '450px' }} onChange={e => this.handleContainer_name_input(e)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">镜像选择</Divider>
                <Form>
                    <Form.Item
                        label="镜像"
                        name="image_name"
                    >
                        <ContainerSearchImage server_ip={this.props.server_ip} onChange={value => this.handleImage_name_input(value)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">端口映射</Divider>
                <Form>
                    <Form.Item
                        label="规则设置"
                        name="ports"
                    >
                        <PortsChoose onChange={value => this.handlePorts(value)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">高级设置(无特殊需求可以忽略)</Divider>
                <Tabs defaultActiveKey="1" tabPosition="left" >
                    <TabPane
                        tab={
                            <span>
                                <AppleOutlined />
                                参数设置
                            </span>
                        }
                        key="1"
                    >
                        <div>
                            <Form>
                                <Form.Item
                                    label="进入命令(cmd)"
                                    name="command"
                                >
                                    <Input placeholder="/bin/bash" style={{ width: '450px' }} onChange={e => this.handleCommand_input(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="入口参数(entrypoint)"
                                    name="entrypoint"
                                >
                                    <Input placeholder="/bin/bash" style={{ width: '450px' }} onChange={e => this.handleEntrypotin_input(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="设定运行用户"
                                    name="user"
                                >
                                    <Input placeholder="root" style={{ width: '450px' }} onChange={e => this.handleUser_input(e)} />
                                </Form.Item>
                            </Form>
                            创建模拟终端(-t):<Switch onChange={() => this.handleIfTty()} style={{ marginLeft: 4, marginRight: 8 }} />
                            |
                            交互模式(-i):<Switch onChange={() => this.handleIfInteractive()} style={{ marginLeft: 4, marginRight: 8 }} />
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                网络设置
                            </span>
                        }
                        key="2"
                    >
                        <div>
                            <Form>
                                <Form.Item
                                    label="网卡选择"
                                    name="network_drive"
                                >
                                    <ContainerSearchNetwork server_ip={this.props.server_ip} onChange={value => this.handleNetwork_name_input(value)} />
                                </Form.Item>
                                <Form.Item
                                    label="主机名(Hostname)"
                                    name="hostname"
                                >
                                    <Input placeholder="hostname" style={{ width: '450px' }} onChange={e => this.handleHostname(e)} />
                                </Form.Item>
                                <Form.Item
                                    label="IP"
                                    name="network_ip"
                                >
                                    <Input placeholder="172.99.99.99" style={{ width: '450px' }} onChange={e => this.handleNetwork_ip(e)} />
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                环境变量
                            </span>
                        }
                        key="3"
                    >
                        <div>
                            <MultipleSwitch args="请为容器设置环境变量" onChange={value => this.handleEvn(value)} />
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                标签设置
                            </span>
                        }
                        key="4"
                    >
                        <div>
                            <MultipleSwitch args="请为容器添加自定义标签(可选)" onChange={value => this.handleLabel(value)} />
                        </div>
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined />
                                资源分配
                            </span>
                        }
                        key="5"
                    >
                        <div>
                            <Form>
                                <Form.Item
                                    label="CPU"
                                    name="cpu"
                                >
                                    <InputNumber
                                        min={0}
                                        max={1}
                                        style={{ marginLeft: 16 }}
                                        step={0.01}
                                    />
                                </Form.Item>
                            </Form>
                            <Form>
                                <Form.Item
                                    label="Memeory"
                                    name="memeory"
                                >
                                    <InputNumber
                                        min={0}
                                        max={1}
                                        style={{ marginLeft: 16 }}
                                        step={0.01}
                                    />
                                </Form.Item>
                            </Form>
                        </div>
                    </TabPane>
                </Tabs>
                <Divider orientation="left">操作</Divider>
                <Button onClick={() => this.handle_send()}>
                    fuck me
                </Button>
            </div>
        )
    }
}


export default function ContainerCreate() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();

    return (<ContainerCreate_page server_ip={server_ip} url={url} />)
}