import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { PageHeader, Input, Form, Divider, Select } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';
import axios from 'axios';


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

    render() {
        const { Option } = Select;
        return (
            <div>
                <NetworkPageHeader />
                <Form>
                    <Form.Item
                        label="名字"
                        name="network_name"
                    >
                        <Input placeholder="为新网络起个名字吧~" />
                    </Form.Item>
                </Form>
                <Divider orientation="left">网络类型配置</Divider>
                <Form>
                    <Form.Item
                        label="网络类型"
                        name="network_type"
                    >
                        <Select defaultValue="bridge" style={{ width: 120 }} >
                            <Option value="bridge">桥接</Option>
                            <Option value="macvlan">混合</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


export default function NetworkCreate() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();

    return (<NetworkCreate_page server_ip={server_ip} url={url} />)
}