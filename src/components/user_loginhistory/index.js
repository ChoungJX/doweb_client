import { Card, message, Modal, Table } from 'antd';
import axios from 'axios';
import React from 'react';



export default function UserLoginhistory(props) {
    return (
        <div>
            <Card title="登录历史一览" >
                <UserLoginHistoryTable />
            </Card>
        </div>
    )
}

class UserLoginHistoryTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        this.setState({ loading: true });
        axios.post('/api',
            {
                api: 'user_history_info',
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
                    data: data.data.data,
                    loading: false,
                })
            });
    }

    render() {
        const { loading, data } = this.state;
        const columns = [
            {
                title: '登录用户',
                key: 'user',
                render: (text, record) => (
                    record.user
                )
            },
            {
                title: '登录时间',
                key: 'time',
                render: (text, record) => (
                    record.time
                )
            }
        ];
        return (
            <Table loading={loading} columns={columns} dataSource={data} size="middle" />
        )
    }
}