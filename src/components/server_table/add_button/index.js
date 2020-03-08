import React from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, Radio } from 'antd';
import { DatabaseOutlined, ApiTwoTone, EditTwoTone } from '@ant-design/icons';
import axios from 'axios';


export default class ServerAddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,

            input_server_ip: "",
            input_server_name: "",
            input_server_type: "http",
        }
    }

    async submit_input() {
        const { input_server_type, input_server_name, input_server_ip } = this.state
        this.setState({
            loading: true
        })

        await axios.post('/api',
            {
                api: 'server_add',
                server_ip: input_server_ip,
                server_name: input_server_name,
                server_type: input_server_type
            }).then(data => {
                this.setState({
                    loading: false,
                    input_server_ip: "",
                    input_server_name: "",
                    input_server_type: "http",
                    visible: false
                })
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

    // ====================================================

    render() {
        const { loading, visible, input_server_type, input_server_name, input_server_ip } = this.state
        return (
            <div>
                <Button
                    type="primary"
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
                        服务器ip:<Input value={input_server_ip} onChange={this.handleInput_server_ip} prefix={<ApiTwoTone />} placeholder="127.0.0.1" />
                        服务器名字:<Input value={input_server_name} onChange={this.handleInput_server_name} prefix={<EditTwoTone />} placeholder="lalala" />
                    </Input.Group>
                    <br />
                    连接类型:
                    <Radio.Group onChange={this.handleInput_server_type} defaultValue={input_server_type} buttonStyle="solid">
                        <Radio.Button value="http">HTTP</Radio.Button>
                        <Radio.Button value="https">HTTPS</Radio.Button>
                    </Radio.Group>
                </Modal>
            </div>
        );
    }
}