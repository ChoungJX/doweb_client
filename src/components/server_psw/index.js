import React from 'react';
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Typography, Descriptions, Alert, PageHeader, Divider } from 'antd';
import axios from 'axios';
const { Paragraph } = Typography;

export default function ServerPsw(props) {
    let { server_ip } = useParams();

    return (
        <div>
            <PageHeader
                ghost={false}
                title="服务器密钥信息"
                subTitle={`服务器:${server_ip}`}
            >
            </PageHeader>
            <Divider />
            <ServerPswShow server_ip={server_ip} />
        </div>
    );
}

class ServerPswShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ""
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
                console.log(data.data.id)
                this.setState({
                    id: data.data.id
                })
            });
    }

    render() {
        const { id } = this.state;
        return (
            <div>
                <Alert
                    message="关于服务器密钥"
                    description="服务器密钥由系统自动生成，用于与控制节点通信时使用，原则上不允许更改。如果服务器与控制节点绑定失败，可尝试复制密钥手动添加至控制节点！"
                    type="info"
                    showIcon
                />
                <br />
                <Descriptions
                    title="服务器密钥"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                    <Descriptions.Item label="服务器密钥">
                        <Paragraph copyable>{id}</Paragraph>
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
}
