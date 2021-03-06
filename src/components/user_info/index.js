import { Card, message, Modal, Table, Tag } from 'antd';
import axios from 'axios';
import React from 'react';
import UserDeleteButton from './delete_button';





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
                    } else if (record.ifadmin === "-1") {
                        return (
                            <Tag color="gold">游客</Tag>
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
                        {<UserDeleteButton disabled={!hasSelected} server_id={this.props.server_id} url={this.props.url} selected={selectedRowKeys} onFresh={() => this.handleRefresh()} />}
                    </div>
                    <Table loading={loading} rowSelection={rowSelection} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}