import { Card, message, Modal, PageHeader, Table, Tag } from 'antd';
import axios from 'axios';
import moment from "moment";
import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import ImageAddButton from './add_button';
import ImageDeleteButton from './delete_button';
import ImageInspect from './image_inspect';




export default function ImageOneServer(props) {
    let { server_id } = useParams();
    let { url } = useRouteMatch();

    return (
        <div>
            <ImagePageHeader />
            <ImageOneServerTable server_id={server_id} url={url} />
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
                    <ImageInspect image_id={record.Id} server_id={this.props.server_id} />
                )
            },
            {
                title: 'Tag',
                key: 'tag',
                render: (text, record) => (
                    <span>
                        {record.RepoTags.map((item, index) => (
                            <Tag key={index} color="#108ee9">{item}</Tag>
                        ))}
                    </span>
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
                server_id: this.props.server_id,
            }).then(data => {
                if (data.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    return;
                } else if (data.data.status === -999) {
                    message.warning(data.data.message);
                    return;
                }

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
                <Card title="镜像一览" extra={<ImageAddButton server_id={this.props.server_id} onFresh={() => this.handleRefresh()} />} >
                    <div style={{ marginBottom: 16 }}>
                        <ImageDeleteButton disabled={!hasSelected} loading={loading} server_id={this.props.server_id} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />
                    </div>
                    <Table pagination={{ defaultPageSize: 5 }} loading={loading} rowSelection={rowSelection} rowKey={record => record.Id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}


function ImagePageHeader() {
    let { server_id } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="镜像详情"
            subTitle={`服务器:${server_id}`}
        >
        </PageHeader>
    );
}