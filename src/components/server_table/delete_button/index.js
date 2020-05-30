import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Modal, notification, Popconfirm, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';



export default class ServerDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async delete_server() {
        this.setState({
            loading: true
        })

        await axios.post('/api',
            {
                api: 'server_delete',
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
                }

                this.setState({
                    loading: false,
                })
                notification.open({
                    message: '删除成功！',
                    description:
                        `节点:${this.props.server_id}删除成功！`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            });
        this.props.onFresh();
    }

    render() {
        const { loading } = this.state;
        return (
            <Tooltip placement="top" title="删除该服务器">
                <Popconfirm disabled={this.props.disabled} placement="right" title="您确定要删除该节点吗" onConfirm={() => this.delete_server()} okText="是" cancelText="否">
                    <Button loading={loading} type="primary" shape="circle" icon={<DeleteOutlined />} danger disabled={this.props.disabled} />
                </Popconfirm>
            </Tooltip>
        );
    }
}