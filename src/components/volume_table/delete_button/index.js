import React from 'react';

import { Button, notification, Popconfirm } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

export default class VolumeDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async delete_volume() {
        this.setState({
            loading: true
        })
        await axios.post('/api',
            {
                api: 'volume_delete_unused',
                server_id: this.props.server_id,
            }).then(data => {
                console.log(data.data.data.data);
                if (!data.data.data.data.message) {
                    let free_size = data.data.data.data.SpaceReclaimed / 1024 / 1024
                    if (free_size > 1000) {
                        free_size = free_size / 1024;
                        free_size = `${free_size.toFixed(2)} GB 储存空间`
                    } else {
                        free_size = `${free_size.toFixed(2)} MB 储存空间`
                    }
                    notification.open({
                        message: '删除成功！',
                        description:
                            `已释放: ${free_size}`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                } else {
                    notification.open({
                        message: '删除失败！',
                        description:
                            `${data.data.data.data.message}`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                }
            });
        this.setState({
            loading: false
        })
        this.props.onFresh();
    }

    render() {
        const { loading } = this.state
        return (
            <Popconfirm placement="top" title="该操作无法撤销，您确定要删除未使用的卷吗？" onConfirm={() => this.delete_volume()} okText="确定" cancelText="我再想想">
                <Button
                    type="primary"
                    shape="round"
                    icon={<DeleteOutlined />}
                    danger
                    disabled={this.props.disabled}
                    loading={loading}
                >
                    删除未使用的卷
            </Button>
            </Popconfirm>
        );
    }
}