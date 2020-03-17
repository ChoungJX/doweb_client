import React from 'react';
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { PageHeader, Tag, Table, Card } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';
import axios from 'axios';
import moment from "moment";

import ImageDeleteButton from './delete_button'
import ImageAddButton from './add_button'
import ImageInspect from './image_inspect'


export default function ImageOneServer(props) {
    let { server_ip } = useParams();
    let { url } = useRouteMatch();

    return (
        <div>
            <ImagePageHeader />
            <ImageOneServerTable server_ip={server_ip} url={url} />
        </div>
    );
}

class ImageOneServerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            selectedRowKeys: [],
        }

        this.columns = [
            {
                title: 'ID',
                key: 'id',
                width: '30%',
                ellipsis: true,
                render: (text, record) => (
                    <ImageInspect image_id={record.Id} server_ip={this.props.server_ip} />
                )
            },
            {
                title: 'Tag',
                key: 'tag',
                render: (text, record) => (
                    <Tag color="#108ee9">{record.RepoTags}</Tag>
                )
            },
            {
                title: '创建时间',
                key: 'time',
                render: (text, record) => (
                    moment(record.Created * 1000).format('YYYY-MM-DD HH:mm:ss')
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
                api: 'image_info',
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
                <Card title="镜像一览" extra={<ImageAddButton server_ip={this.props.server_ip} onFresh={() => this.handleRefresh()} />} >
                    <div style={{ marginBottom: 16 }}>
                        <ImageDeleteButton disabled={!hasSelected} loading={loading} server_ip={this.props.server_ip} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />
                    </div>
                    <Table loading={loading} rowSelection={rowSelection} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}


function ImagePageHeader() {
    let { server_ip } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="镜像详情"
            subTitle={`服务器:${server_ip}`}
        >
        </PageHeader>
    );
}