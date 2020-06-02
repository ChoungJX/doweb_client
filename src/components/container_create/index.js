import { ApartmentOutlined, BarChartOutlined, BarcodeOutlined, DropboxOutlined, SlidersOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, InputNumber, message, Modal, notification, PageHeader, Switch, Tabs } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import ContainerSearchImage from "./image_select";
import MultipleSwitch from './mutiple_switch';
import ContainerSearchNetwork from "./network_select";
import PortsChoose from './ports_choose';



const { TabPane } = Tabs;

function ContainerPageHeader() {
    let { server_id } = useParams();

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="创建容器"
            subTitle={`服务器:${server_id}`}
        >
        </PageHeader>
    );
}

class ContainerCreatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,

            container_name_input: "",
            image_name_input: "",
            ports: {},
            ports2: {},

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
            image_name_input: value.value
        })
    }

    handlePorts(value1, value2) {
        let temp_dict = {};
        let temp_dict2 = {}
        for (let i = 0; i < value1.length; i++) {
            temp_dict = { ...temp_dict, ...JSON.parse(value1[i]) }
        }
        for (let i = 0; i < value2.length; i++) {
            temp_dict2 = { ...temp_dict2, ...JSON.parse(value2[i]) }
        }
        this.setState({
            ports: temp_dict,
            ports2: temp_dict2,
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
        //console.log(this.state);
    }
    // =======================================================

    async handle_send() {
        const {
            container_name_input,
            image_name_input,
            ports,
            ports2,
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

        let aaa = hostname;
        aaa = env;
        aaa = label;//暂时没用

        if (image_name_input === "") {
            message.error('必要信息没有填写完整！');
            return;
        }

        let network_config = '';
        if (network_name_input !== "") {
            network_config = `{"${network_name_input}":{"IPAMConfig":{"IPv4Address":"${network_ip}"}}}`;
            network_config = JSON.parse(network_config);
        }

        message.loading({ content: '容器创建中', key: 'updatable', duration: 0 });
        this.setState({
            loading: true
        })
        await axios.post('/api',
            {
                api: 'container_add',
                server_id: this.props.server_id,
                image: image_name_input,
                name: container_name_input,
                connect_port: ports,
                export_port: ports2,
                cmd: command_input,
                entrypoint: entrypotin_input,
                user: user_input,
                Tty: ifTty,
                interactive: ifInteractive,
                network_model: network_config,
            }).then(data => {
                if (data.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    return;
                }

                this.setState({
                    loading: false
                })
                setTimeout(() => {
                    message.success({ content: '客户端已接收数据！', key: 'updatable', duration: 2 });
                }, 1000);
                //console.log(data.data.data.data);
                if (!data.data.data.data.message) {
                    notification.open({
                        message: '创建成功！',
                        description:
                            `容器创建成功！`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                    message.loading({ content: '容器启动中', key: 'updatable', duration: 0 });
                    axios.post('/api',
                        {
                            api: 'container_start',
                            server_id: this.props.server_id,
                            container_id: data.data.data.data.Id

                        }).then(data => {
                            if (data.data.status === -666) {
                                Modal.error({
                                    title: '错误：登录已经失效！',
                                    content: '请重新登录！',
                                    onOk() {
                                        window.location.replace("/")
                                    },
                                });
                                return;
                            }

                            setTimeout(() => {
                                message.success({ content: '容器启动成功！', key: 'updatable', duration: 2 });
                            }, 1000);
                            window.history.back();
                        });
                    return;
                }
                notification.open({
                    message: '创建失败！',
                    description:
                        `${data.data.data.data.message}`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            }).catch(err => {
                message.error("与服务器通讯失败！请稍后再试")
            });
    }

    render() {
        const { loading } = this.state;
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
                        <ContainerSearchImage server_id={this.props.server_id} onChange={value => this.handleImage_name_input(value)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">端口映射</Divider>
                <Form>
                    <Form.Item
                        label="规则设置"
                        name="ports"
                    >
                        <PortsChoose onChange={(value1, value2) => this.handlePorts(value1, value2)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">高级设置(无特殊需求可以忽略)</Divider>
                <Tabs defaultActiveKey="1"  >
                    <TabPane
                        tab={
                            <span>
                                <SlidersOutlined />
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
                                <ApartmentOutlined />
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
                                    <ContainerSearchNetwork server_id={this.props.server_id} onChange={value => this.handleNetwork_name_input(value)} />
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
                                <DropboxOutlined />
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
                                <BarcodeOutlined />
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
                                <BarChartOutlined />
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
                <Button type="primary" loading={loading} onClick={() => this.handle_send()}>
                    提交
                </Button>
            </div>
        )
    }
}


export default function ContainerCreate() {
    let { server_id } = useParams();
    let { url } = useRouteMatch();

    return (
        <div>
            <ContainerCreatePage server_id={server_id} url={url} />
        </div>
    )
}