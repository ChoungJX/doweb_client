import React from 'react';
import 'antd/dist/antd.css';
import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

export default class UserDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async delete_user() {
        this.setState({
            loading: true
        })
        for (let i = 0; i < this.props.selected.length; i++) {
            await axios.post('/api',
                {
                    api: 'user_delete',
                    user_id: this.props.selected[i],
                }).then(data => {
                    console.log(data.data);
                    if (data.data.status === 0) {
                        notification.open({
                            message: '删除成功！',
                            description:
                                `用户:${this.props.selected[i]} 删除成功！`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    } else if (data.data.status === 1) {
                        notification.open({
                            message: '删除失败！',
                            description:
                                `你不能删除自己的账户`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    } else if (data.data.status === -1) {
                        notification.open({
                            message: '删除失败！',
                            description:
                                `该用户不存在`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    }
                });
        }
        this.setState({
            loading: false
        })
        this.props.onFresh();
    }

    render() {
        const { loading } = this.state
        return (
            <Popconfirm disabled={this.props.disabled} placement="top" title="该操作无法撤销，您确定要删除这些用户吗" onConfirm={() => this.delete_user()} okText="确定" cancelText="取消">
                <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                    danger
                    disabled={this.props.disabled}
                    loading={loading}
                >
                    删除所选用户
                </Button>
            </Popconfirm>
        );
    }
}