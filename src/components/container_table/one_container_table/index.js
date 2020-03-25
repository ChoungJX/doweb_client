import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom'

import { Table, Tag, PageHeader, Card } from 'antd';

import axios from 'axios';
import moment from "moment";

import OneContainerActionButton from './one_container_action_button'
import ContainerInspect from './one_container_inspect'

function ContainerPageHeader() {
    let { server_id } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="容器详情"
            subTitle={`服务器:${server_id}`}
        >
        </PageHeader>
    );
}

function ContainerInspectButton(props) {
    let { server_id } = useParams();

    return (
        <ContainerInspect server_id={server_id} container_id={props.container_id} onFresh={() => props.onFresh()} />
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
                title: '容器ip',
                key: 'ip',
                render: (text, record) => this.show_ip(text, record)
            },
            {
                title: '状态',
                key: 'stauts',
                render: (text, record) => {
                    if (record.State === "running") {
                        return (<Tag color="cyan">{record.State}</Tag>);
                    } else {
                        return (<Tag color="red">{record.State}</Tag>)
                    }
                }
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
                        <ContainerInspectButton container_id={record.Id} onFresh={() => this.handleRefresh()} />
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
            loading: false
        })
    }

    handleLoading() {
        this.setState({
            loading: true
        })
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    fetch() {
        axios.post('/api',
            {
                api: 'container_info',
                server_id: this.props.server_id,
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data: data.data.data.data,
                    loading: false,
                })
            });
    }

    show_ip(text, record) {
        let get_net_work_name = Object.keys(record.NetworkSettings.Networks)[0]
        return (
            record.NetworkSettings.Networks[get_net_work_name].IPAddress
        )
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
                <Card title="容器一览" extra={<OneContainerActionButton disabled={!hasSelected} loading={loading} server_id={this.props.server_id} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} onLoading={() => this.handleLoading()} />} >
                    <Table loading={loading} rowSelection={rowSelection} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}



export default function ContainerOneServer() {
    let { server_id } = useParams();
    let { url } = useRouteMatch();
    return (
        <div>
            <ContainerPageHeader />
            <ContainerOneServerTable server_id={server_id} url={url} />
        </div>
    )
}