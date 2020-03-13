import React from 'react';
import 'antd/dist/antd.css';
import { Button, message, Result, Input, Radio, Card } from 'antd';
import { DatabaseTwoTone, ApiTwoTone, EditTwoTone, ContactsTwoTone, EyeInvisibleTwoTone } from '@ant-design/icons';
import axios from 'axios';

export default function welcome_3(props) {
    return (
        <WelcomeBindServer onNext={() => props.onNext()} />
    );
}


class WelcomeBindServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            server_ip_input: "",
            server_name_input: "",
            server_type_input: "http",
            server_user_input: "root",
            server_psw_input: "",
        }
    }

    handleServer_ip_input(e) {
        this.setState({
            server_ip_input: e.target.value
        })
    }

    handleServer_name_input(e) {
        this.setState({
            server_name_input: e.target.value
        })
    }

    handleServer_type_input(e) {
        this.setState({
            server_type_input: e.target.value
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

    send_args() {
        const { server_ip_input, server_name_input, server_type_input, server_user_input, server_psw_input } = this.state
        axios.post('/welcome_api',
            {
                api: 'create_server',
                server_ip: server_ip_input,
                server_name: server_name_input,
                server_type: server_type_input,
                server_user: server_user_input,
                server_psw: server_psw_input

            }).then(data => {
                console.log(data.data)
                if (data.data.status === 0) {
                    this.props.onNext();
                } else {
                    message.info(data.data.message);
                }
            });
    }

    render() {
        const { server_ip_input, server_name_input, server_type_input, server_user_input, server_psw_input } = this.state
        return (
            <Result
                icon={<DatabaseTwoTone />}
                title="请绑定您第一台服务器节点"
                extra={
                    <div>
                        <center>
                            <Card title="请输入服务器信息" bordered={false} style={{ width: 500 }}>
                                <Input.Group>
                                    服务器ip:<Input onChange={(e) => this.handleServer_ip_input(e)} value={server_ip_input} style={{ width: 300, marginLeft: 10 }} prefix={<ApiTwoTone />} placeholder="127.0.0.1" />
                                    <br /><br />
                                    服务器名字:<Input onChange={(e) => this.handleServer_name_input(e)} value={server_name_input} style={{ width: 290, marginLeft: 5 }} prefix={<EditTwoTone />} placeholder="lalala" />
                                </Input.Group>
                                <br />
                                连接类型:
                                <Radio.Group onChange={(e) => this.handleServer_type_input(e)} defaultValue={server_type_input} buttonStyle="solid">
                                    <Radio.Button value="http">HTTP</Radio.Button>
                                    <Radio.Button value="https">HTTPS</Radio.Button>
                                </Radio.Group>
                                <br /><br />
                                <Input.Group>
                                    服务器用户名:<Input onChange={(e) => this.handleServer_user_input(e)} value={server_user_input} style={{ width: 280, marginLeft: 10 }} prefix={<ContactsTwoTone />} placeholder="root" />
                                    <br /><br />
                                    服务器密码:<Input onChange={(e) => this.handleServer_psw_input(e)} value={server_psw_input} style={{ width: 300, marginLeft: 5 }} prefix={<EyeInvisibleTwoTone />} placeholder="******" />
                                </Input.Group>
                            </Card>
                            <Button onClick={() => this.send_args()} type="primary">下一步</Button>
                        </center>
                    </div>
                }
            />
        );
    }
}