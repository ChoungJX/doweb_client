import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, message, Modal, notification } from 'antd';
import axios from 'axios';
import React from 'react';



export default class ImageDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async delete_image() {
        this.setState({
            loading: true
        })
        for (let i = 0; i < this.props.selected.length; i++) {
            await axios.post('/api',
                {
                    api: 'image_delele',
                    server_id: this.props.server_id,
                    image_id: this.props.selected[i],
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

                    if (!data.data.data.data.message) {
                        notification.open({
                            message: '删除成功！',
                            description:
                                `镜像删除成功！`,
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
        }
        this.setState({
            loading: false
        })
        this.props.onFresh();
    }

    render() {
        const { loading } = this.state
        return (
            <Button
                type="primary"
                shape="round"
                icon={<DeleteOutlined />}
                danger
                disabled={this.props.disabled}
                loading={loading}
                onClick={() => this.delete_image()}
            >
                删除所选镜像
            </Button>
        );
    }
}