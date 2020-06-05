import { Card, message, Modal, PageHeader, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import VolumeDeleteButton from './delete_button';






function VolumePageHeader() {
    let { server_id } = useParams();

    return (
        <PageHeader
            ghost={false}
            title="卷详情"
            subTitle={`服务器:${server_id}`}
        >
        </PageHeader>
    );
}

export default function VolumeOneServer() {
    let { server_id } = useParams();
    let { url } = useRouteMatch();
    return (
        <div>
            <VolumePageHeader />
            <VolumeOneServerTable server_id={server_id} url={url} />
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
                <Card title="卷一览" extra={<VolumeDeleteButton server_id={this.props.server_id} onFresh={() => this.fresh_table()} />} >
                    <Table pagination={{ defaultPageSize: 5 }} loading={loading} rowKey={record => record.Name} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}