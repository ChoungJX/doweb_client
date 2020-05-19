import React from 'react';
import { useParams } from 'react-router-dom'

import { Typography, Descriptions, Alert, PageHeader, Divider, message } from 'antd';
import axios from 'axios';
const { Paragraph } = Typography;

export default function ServerPsw(props) {
    let { server_id } = useParams();

    return (
        <div>
            <PageHeader
                ghost={false}
                title="服务器密钥信息"
                subTitle={`服务器:${server_id}`}
            >
            </PageHeader>
            <Divider />
            <ServerPswShow server_id={server_id} />
        </div>
    );
}

class ServerPswShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            user: "暂无权限查看",
            psw: "暂无权限查看"
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'psw_check',
            }).then(data => {
                //console.log(data.data.id)
                this.setState({
                    id: data.data.id
                })
            });
        axios.post('/api',
            {
                api: 'server_ssh_info',
                server_id: this.props.server_id,
            }).then(data => {
                this.setState({
                    user: data.data.data.user,
                    psw: data.data.data.psw
                })
            });
    }

    onChangeUser = str => {
        const { user } = this.state;
        if (user === str) {
            return;
        }
        if (str.length === 0) {
            message.error("请输入用户名！");
            return;
        }
        axios.post('/api',
            {
                api: 'server_change_user',
                server_id: this.props.server_id,
                server_user: str,
            }).then(data => {
                if (data.data.status === 0) {
                    this.setState({
                        user: str
                    })
                    message.success("用户修改成功！")
                } else {
                    message.warning("只有管理员才能修改")
                }
            }).catch(err => {
                message.error("服务器开小差了，请稍后再试")
            });
    };

    onChangePsw = str => {
        const { psw } = this.state;
        if (psw === str) {
            return;
        }
        if (str.length === 0) {
            message.error("请输入密码！");
            return;
        }
        axios.post('/api',
            {
                api: 'server_change_psw',
                server_id: this.props.server_id,
                server_psw: str,
            }).then(data => {
                if (data.data.status === 0) {
                    this.setState({
                        psw: str
                    })
                    message.success("密码修改成功！")
                } else {
                    message.warning("只有管理员才能修改")
                }
            }).catch(err => {
                message.error("服务器开小差了，请稍后再试")
            });
    };

    render() {
        const { id, user, psw } = this.state;
        return (
            <div>
                <Alert
                    message="关于通讯密钥"
                    description="通讯密钥由系统自动生成，用于与控制节点通信时使用，原则上不允许更改。如果服务器与控制节点绑定失败，可尝试复制通讯密钥手动添加至控制节点！"
                    type="info"
                    showIcon
                />
                <br />
                <Descriptions
                    title="服务器密钥"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="通讯密钥" span={4}>
                        <Paragraph copyable>{id}</Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="登录服务器用户">
                        <Paragraph editable={{ onChange: this.onChangeUser }}>{user}</Paragraph>
                    </Descriptions.Item>
                    <Descriptions.Item label="登录服务器密码">
                        <Paragraph editable={{ onChange: this.onChangePsw }}>{psw}</Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}
