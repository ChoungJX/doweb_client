import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, Button, Tag, PageHeader } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';

function ContainerPageHeader() {
    let { server_ip } = useParams();

    return (
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title="容器详情"
            subTitle={`服务器:${server_ip}`}
        >
        </PageHeader>
    );
}

function ContainerInspectButton(props) {
    let { url } = useRouteMatch();

    return (
        <Link to={`${url}/${props.container_id}`} >
            <Button type="primary" shape="circle" icon={<EyeOutlined />} />
        </Link>
    )
}

class ContainerOneServerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }

        this.columns = [
            {
                title: '名字',
                dataIndex: 'Names',
                key: 'name',
            },
            {
                title: '对应镜像',
                key: 'image',
                render: (text, record) => (
                    record.Image
                )
            },
            {
                title: '节点ip',
                key: 'ip',
                render: (text, record) => (
                    record.NetworkSettings.Networks.bridge.IPAddress
                )
            },
            {
                title: '状态',
                key: 'stauts',
                render: (text, record) => (
                    <Tag color="cyan">{record.State}</Tag>
                )
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <ContainerInspectButton container_id={record.Id} />
                    </span>
                ),
            },
        ];
    }

    componentDidMount() {
        this.fetch();
    }

    handleRefresh() {
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'container_info',
                server_ip: this.props.server_ip,
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data: data.data.data.data,
                    loading: false,
                })
            });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <div>
                <Table loading={loading} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
            </div>
        );
    }
}



export default function ContainerOneServer() {
    let { server_ip } = useParams();

    return (
        <div>
            <ContainerPageHeader />
            <ContainerOneServerTable server_ip={server_ip} />
        </div>
    )
}