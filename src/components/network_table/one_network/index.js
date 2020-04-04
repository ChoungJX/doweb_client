import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'

import { PageHeader, Button, Tag, Table, Card } from 'antd';
import { ApartmentOutlined } from '@ant-design/icons';
import axios from 'axios';

import NetworkDeleteButton from './delete_button'
import NetworkInspect from './network_inspect'

export default function NetworkOneServer(props) {
    let { server_id } = useParams();
    let { url } = useRouteMatch();

    return (
        <div>
            <NetworkPageHeader />
            <NetworlOneServerTable server_id={server_id} url={url} />
        </div>
    );
}

class NetworlOneServerTable extends React.Component {
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
                key: 'name',
                render: (text, record) => (
                    <NetworkInspect network_name={record.Name} network_id={record.Id} server_id={this.props.server_id} />
                )
            },
            {
                title: '网络类型',
                key: 'type',
                render: (text, record) => (
                    <Tag color="#2db7f5">{record.Driver}</Tag>
                )
            },
            {
                title: '创建时间',
                key: 'time',
                render: (text, record) => (
                    record.Created
                )
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
                api: 'network_info',
                server_id: this.props.server_id,
            }).then(data => {
                //console.log(data.data.data.data)
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
                <Card title="网络一览"
                    extra={
                        <Link to={`${this.props.url}/create`}>
                            <Button type="primary" shape="round" icon={<ApartmentOutlined />} >
                                添加新网络
                        </Button>
                        </Link>
                    }
                >
                    <div style={{ marginBottom: 16 }}>
                        {<NetworkDeleteButton disabled={!hasSelected} server_id={this.props.server_id} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />}
                    </div>
                    <Table pagination={{ defaultPageSize: 5 }} loading={loading} rowSelection={rowSelection} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}

function NetworkPageHeader() {
    let { server_id } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="网络详情"
            subTitle={`服务器:${server_id}`}
        >
        </PageHeader>
    );
}