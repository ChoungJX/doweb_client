import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { PageHeader, Input, Form, Divider, Select, Button, message, notification } from 'antd';
import { UploadOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

import NetworkTypeOption from './network_type_option'


function NetworkPageHeader() {
    let { server_ip } = useParams();

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="创建新网络"
            subTitle={`服务器:${server_ip}`}
        >
        </PageHeader>
    );
}

class NetworkCreate_page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,

            network_name_input: "",
            network_type_input: "bridge",
            network_type_option_input: [],
            network_subnet_input: "",
            network_iprange_input: "",
            network_gateway_input: "",
            network_label_input: [],
        }
    }

    // =======================获取输入=======================
    handleNetwork_name_input(e) {
        this.setState({
            network_name_input: e.target.value,
        })
    }

    handleNetwork_type_input(value) {
        this.setState({
            network_type_input: value,
        })
    }

    handleNetwork_type_option_input(value) {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            temp_list = [...temp_list, JSON.parse(value[i])]
        }
        this.setState({
            network_type_option_input: temp_list,
        })
    }

    handleNetwork_subnet_input(e) {
        this.setState({
            network_subnet_input: e.target.value,
        })
    }

    handleNetwork_iprange_input(e) {
        this.setState({
            network_iprange_input: e.target.value,
        })
    }

    handleNetwork_gateway_input(e) {
        this.setState({
            network_gateway_input: e.target.value,
        })
    }

    handleNetwork_label_input(value) {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            temp_list = [...temp_list, JSON.parse(value[i])]
        }
        this.setState({
            network_label_input: temp_list,
        })
    }
    // =====================================================

    async handleUpload() {
        this.setState({
            loading: true
        })
        const {
            network_name_input,
            network_type_input,
            network_type_option_input,
            network_subnet_input,
            network_iprange_input,
            network_gateway_input,
            network_label_input,
        } = this.state

        if (network_name_input === "" || network_subnet_input === "") {
            message.error('必要信息没有填写完整！');
            this.setState({
                loading: false
            })
            return;
        }
        message.loading({ content: '网络创建中', key: 'updatable', duration: 0 });
        await axios.post('/api',
            {
                api: 'network_create',
                server_ip: this.props.server_ip,
                network_name: network_name_input,
                network_drive: network_type_input,
                subnet: network_subnet_input,
                ip_range: network_iprange_input,
                gateway: network_gateway_input,
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
        this.setState({
            loading: false
        })
    }

    render() {
        const { Option } = Select;
        const { loading } = this.state;
        return (
            <div>
                <NetworkPageHeader />
                <Form>
                    <Form.Item
                        label="名字"
                        name="network_name"
                    >
                        <Input placeholder="为新网络起个名字吧~" style={{ width: '450px' }} onChange={e => this.handleNetwork_name_input(e)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">网络类型配置</Divider>
                <Form>
                    <Form.Item
                        label="网络类型"
                        name="network_type"
                    >
                        <Select defaultValue="bridge" style={{ width: '450px' }} onChange={value => this.handleNetwork_type_input(value)}>
                            <Option value="bridge">桥接</Option>
                            <Option value="macvlan">混合</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="网络类型选项"
                        name="network_type_option"
                    >
                        <NetworkTypeOption args="请为网络添加自定义选项(可选)" onChange={value => this.handleNetwork_type_option_input(value)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">网络详情配置</Divider>
                <Form>
                    <Form.Item
                        label="子网段"
                        name="subnet"
                    >
                        <Input placeholder="如:172.18.0.0/16" style={{ width: '450px' }} onChange={e => this.handleNetwork_subnet_input(e)} />

                    </Form.Item>
                    <Form.Item
                        label="IP段"
                        name="iprange"
                    >
                        <Input placeholder="如:172.18.0.0/25" style={{ width: '450px' }} onChange={e => this.handleNetwork_iprange_input(e)} />

                    </Form.Item>
                    <Form.Item
                        label="网关"
                        name="gateway"
                    >
                        <Input placeholder="如:172.18.0.1" style={{ width: '450px' }} onChange={e => this.handleNetwork_gateway_input(e)} />

                    </Form.Item>
                </Form>
                <Divider orientation="left">高级配置</Divider>
                <Form>
                    <Form.Item
                        label="网络类型选项"
                        name="network_type_option"
                    >
                        <NetworkTypeOption args="请为网络添加自定义标签(可选)" onChange={value => this.handleNetwork_label_input(value)} />
                    </Form.Item>
                </Form>
                <Divider orientation="left">操作</Divider>
                <Button type="primary" icon={<UploadOutlined />} shape="round" onClick={() => this.handleUpload()} loading={loading} >
                    创建网络
                </Button>
            </div>
        )
    }
}


export default function NetworkCreate() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();

    return (<NetworkCreate_page server_ip={server_ip} url={url} />)
}