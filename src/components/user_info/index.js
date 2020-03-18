import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

import { Card, Table, Tag } from 'antd';

import UserDeleteButton from './delete_button'


export default function UserInfo(props) {

    return (
        <div>
            <UserInfoTable {...props} />
        </div>
    );
}



class UserInfoTable extends React.Component {
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
                ellipsis: true,
                render: (text, record) => (
                    record.id
                )
            },
            {
                title: '名字',
                key: 'name',
                render: (text, record) => (
                    record.username
                )
            },
            {
                title: '身份',
                key: 'type',
                render: (text, record) => {
                    if (record.ifadmin === "100") {
                        return (
                            <Tag color="red">管理员</Tag>
                        )
                    } else {
                        return (
                            <Tag color="geekblue">普通用户</Tag>
                        )
                    }
                }
            },
        ];
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'user_info',
                server_ip: this.props.server_ip,
            }).then(data => {
                console.log(data.data.data)
                this.setState({
                    data: data.data.data,
                    loading: false,
                })
            });
    }

    onSelectChange = selectedRowKeys => {
        this.setState({ selectedRowKeys });
    };

    handleRefresh() {
        this.fetch();
        this.setState({
            selectedRowKeys: [],
        })
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
                <Card title="用户一览" >
                    <div style={{ marginBottom: 16 }}>
                        {<UserDeleteButton disabled={!hasSelected} server_ip={this.props.server_ip} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />}
                    </div>
                    <Table loading={loading} rowSelection={rowSelection} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}