import { FullscreenOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Table, Tag, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ServerAddButton from './add_button';
import ServerDeleteButton from './delete_button';
import './index.css';



export class ServerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }

        this.columns = [
            {
                title: '节点名字',
                dataIndex: 'server_name',
                key: 'name',
            },
            {
                title: '节点ip',
                dataIndex: 'server_ip',
                key: 'age',
            },
            {
                title: '状态',
                key: 'server_status',
                render: (text, record) => {
                    if (record.server_status === 0) {
                        return (<Tag color="green">在线</Tag>)
                    } else {
                        return (<Tag color="red">离线</Tag>)
                    }
                }
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    if (record.server_status === 0) {
                        return (
                            <div>
                                <span style={{ marginRight: 8 }}>
                                    <Tooltip placement="top" title="进入该服务器">
                                        <Link to={`${this.props.url}control/${record.id}`} >
                                            <Button type="primary" shape="circle" icon={<FullscreenOutlined />} />
                                        </Link>
                                    </Tooltip>
                                </span>
                                <span style={{ marginRight: 8 }}>
                                    <ServerDeleteButton server_id={record.id} onFresh={() => this.handleRefresh()} />
                                </span>
                            </div>
                        );
                    } else {
                        return (
                            <div>
                                <span style={{ marginRight: 8 }}>
                                    <Tooltip placement="top" title="进入该服务器">
                                        <Link to={`${this.props.url}control/${record.id}`} >
                                            <Button type="primary" shape="circle" icon={<FullscreenOutlined />} disabled />
                                        </Link>
                                    </Tooltip>
                                </span>
                                <span style={{ marginRight: 8 }}>
                                    <ServerDeleteButton server_id={record.id} onFresh={() => this.handleRefresh()} disabled={true} />
                                </span>
                            </div>
                        );
                    }
                },
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
        this.setState({
            loading: true
        });
        axios.post('/api',
            {
                api: 'server_info',
            }).then(d => {
                if (d.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    return;
                }

                this.setState({
                    data: d.data.data,
                    loading: false,
                })
                for (let i = 0; i < d.data.data.length; i++) {
                    axios.post('/api',
                        {
                            api: 'server_check',
                            server_id: d.data.data[i].id,
                        }).then(d2 => {
                            if (d2.data.status === -666) {
                                Modal.error({
                                    title: '错误：登录已经失效！',
                                    content: '请重新登录！',
                                    onOk() {
                                        window.location.replace("/")
                                    },
                                });
                                return;
                            }

                            const { data } = this.state;
                            data[i]["server_status"] = d2.data.status
                            this.setState({
                                data: data,
                            })
                        });
                }
            });
    }


    render() {
        const { data, loading } = this.state;
        return (
            <div>
                <Card title="服务器一览" extra={<ServerAddButton onFresh={() => this.handleRefresh()} />} >
                    <Table loading={loading} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}


export default function ServerTableHook() {
    let { url } = useRouteMatch();

    return (
        <ServerTable url={url} />
    );
}