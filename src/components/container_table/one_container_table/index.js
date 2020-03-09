import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, Button, Tag, PageHeader, Card } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from "moment";

import OneContainerActionButton from './one_container_action_button'

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
            selectedRowKeys: [],
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
                title: '创建时间',
                key: 'time',
                render: (text, record) => (
                    moment(record.Created * 1000).format('YYYY-MM-DD HH:mm:ss')
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
        this.setState({
            selectedRowKeys: [],
        })
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

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
        const { data, loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div>
                <Card title="容器一览" extra={<OneContainerActionButton disabled={!hasSelected} loading={loading} server_ip={this.props.server_ip} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />} >
                    <Table loading={loading} rowSelection={rowSelection} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}



export default function ContainerOneServer() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();
    return (
        <div>
            <ContainerPageHeader />
            <ContainerOneServerTable server_ip={server_ip} url={url} />
        </div>
    )
}