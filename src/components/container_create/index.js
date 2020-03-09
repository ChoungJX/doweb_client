import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { PageHeader, Input, Form } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';
import axios from 'axios';


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

    render() {
        return (
            <div>
                <ContainerPageHeader />
                <Form>
                    <Form.Item
                        label="名字"
                        name="container_name"
                    >
                        <Input placeholder="Basic usage" />
                    </Form.Item>
                </Form>
            </div>
        )
    }
}


export default function ContainerCreate() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();

    return (<ContainerCreate_page server_ip={server_ip} url={url} />)
}