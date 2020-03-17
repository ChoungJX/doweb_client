import React from 'react';
import { useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, Tag, PageHeader, Card } from 'antd';

import axios from 'axios';

import VolumeDeleteButton from './delete_button'



function VolumePageHeader() {
    let { server_ip } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="卷详情"
            subTitle={`服务器:${server_ip}`}
        >
        </PageHeader>
    );
}

export default function VolumeOneServer() {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();
    return (
        <div>
            <VolumePageHeader />
            <VolumeOneServerTable server_ip={server_ip} url={url} />
        </div>
    )
}

class VolumeOneServerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }

        this.columns = [
            {
                title: '名字',
                dataIndex: 'Name',
                key: 'name',
            },
            {
                title: '创建时间',
                key: 'time',
                dataIndex: 'CreatedAt',
            }
        ];
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'volume_info',
                server_ip: this.props.server_ip,
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data: data.data.data.data.Volumes,
                    loading: false,
                })
            });
    }

    fresh_table() {
        this.fetch();
    }


    render() {
        const { data, loading } = this.state;
        return (
            <div>
                <Card title="卷一览" extra={<VolumeDeleteButton server_ip={this.props.server_ip} onFresh={() => this.fresh_table()} />} >
                    <Table loading={loading} rowKey={record => record.Name} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}