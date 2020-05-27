import { ApiTwoTone, ContactsTwoTone, DatabaseOutlined, DatabaseTwoTone, EditTwoTone, EyeInvisibleTwoTone, SmileOutlined } from '@ant-design/icons';
import { Button, Input, Modal, notification, Radio, message } from 'antd';

import axios from 'axios';
import React from 'react';


export default class ServerAddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,

            input_server_ip: "",
            input_server_name: "",
            input_server_type: "http",
            server_user_input: "root",
            server_psw_input: "",
            input_server_ssh_ip: "",
        }
    }

    async submit_input() {
        const { input_server_type, input_server_name, input_server_ip, server_user_input, server_psw_input, input_server_ssh_ip } = this.state
        if (input_server_type.length > 30 || input_server_name.length > 30 || server_user_input.length > 30 || server_psw_input.length > 30 || input_server_ssh_ip.length > 30) {
            console.log()
            return;
        }
        this.setState({
            loading: true
        })

        await axios.post('/api',
            {
                api: 'server_add',
                server_ip: input_server_ip,
                server_name: input_server_name,
                server_type: input_server_type,
                server_ssh_ip: input_server_ssh_ip,
                server_user: server_user_input,
                server_psw: server_psw_input
            }).then(data => {
                this.setState({
                    loading: false,
                    input_server_ip: "",
                    input_server_name: "",
                    input_server_type: "http",
                    server_user_input: "root",
                    server_psw_input: "",
                    input_server_ssh_ip: "",
                    visible: false
                })
                notification.open({
                    message: '创建成功！',
                    description:
                        `节点:${input_server_name}创建成功！`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            }).catch(err => {
                this.setState({
                    loading: false,
                });
                message.error("与服务器通讯失败！请检测输入是否正确")
            });
        this.props.onFresh();
    }

    // =================================================
    // 监听对话框
    // =================================================
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.submit_input();
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    // ====================================================

    // ==========================================
    // 监听输入框
    // ==========================================
    handleInput_server_type = (e) => {
        this.setState({
            input_server_type: e.target.value
        })
    }

    handleInput_server_ip = (e) => {
        this.setState({
            input_server_ip: e.target.value
        })
    }

    handleInput_server_name = (e) => {
        this.setState({
            input_server_name: e.target.value
        })
    }

    handleInput_server_sship = (e) => {
        this.setState({
            input_server_ssh_ip: e.target.value
        })
    }

    handleServer_user_input(e) {
        this.setState({
            server_user_input: e.target.value
        })
    }

    handleServer_psw_input(e) {
        this.setState({
            server_psw_input: e.target.value
        })
    }

    // ====================================================

    render() {
        const { loading, visible, input_server_type, input_server_name, input_server_ip, server_user_input, server_psw_input, input_server_ssh_ip } = this.state
        return (
            <div>
                <Button
                    type="primary"
                    shape="round"
                    icon={<DatabaseOutlined />}
                    onClick={this.showModal}
                >
                    添加新的服务器节点
            </Button>
                <Modal
                    visible={visible}
                    title="添加服务器"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            提交
                        </Button>,
                    ]}
                >
                    <Input.Group>
                        服务器ip或域名:<Input value={input_server_ip} onChange={this.handleInput_server_ip} prefix={<ApiTwoTone />} placeholder="127.0.0.1" />
                        服务器名字:<Input value={input_server_name} onChange={this.handleInput_server_name} prefix={<EditTwoTone />} placeholder="lalala" />
                    </Input.Group>
                    <br />
                    连接类型:
                    <Radio.Group onChange={this.handleInput_server_type} defaultValue={input_server_type} buttonStyle="solid">
                        <Radio.Button value="http">HTTP</Radio.Button>
                        <Radio.Button value="https">HTTPS</Radio.Button>
                    </Radio.Group>
                    <br /><br />
                    <Input.Group>
                        ssh服务IP:<Input onChange={(e) => this.handleInput_server_sship(e)} value={input_server_ssh_ip} style={{ width: 280, marginLeft: 10 }} prefix={<DatabaseTwoTone />} placeholder="127.0.0.1:22" />
                        <br /><br />
                        服务器用户名:<Input onChange={(e) => this.handleServer_user_input(e)} value={server_user_input} style={{ width: 280, marginLeft: 10 }} prefix={<ContactsTwoTone />} placeholder="root" />
                        <br /><br />
                        服务器密码:<Input onChange={(e) => this.handleServer_psw_input(e)} value={server_psw_input} style={{ width: 300, marginLeft: 5 }} prefix={<EyeInvisibleTwoTone />} placeholder="******" />
                    </Input.Group>
                </Modal>
            </div>
        );
    }
}