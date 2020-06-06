import { ControlTwoTone } from '@ant-design/icons';
import { Button, Card, message, Modal, Table } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';



function IntoButton(props) {
    let { url } = useRouteMatch();
    return (
        <Link to={`${url}/${props.server_id}`} >
            <Button type="primary" shape="circle" icon={<ControlTwoTone />} />
        </Link>
    );
}

export class CommonTable extends React.Component {
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
                title: '进入',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <IntoButton server_id={record.id} />
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
                api: 'server_info',
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
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                this.setState({
                    data: data.data.data,
                    loading: false,
                })
            });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <div>
                <Card title="请选择服务器" >
                    <Table loading={loading} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}