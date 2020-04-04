import { DownloadOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, notification } from 'antd';
import axios from 'axios';
import React from 'react';



export default class ImageAddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,

            input_image_name: ""
        }
    }

    async send_message() {
        const { input_image_name } = this.state;
        this.setState({
            loading: true,
        })
        message.loading({ content: '服务器下载中...', key: 'updatable', duration: 0 });
        await axios.post('/api',
            {
                api: 'image_pull',
                server_id: this.props.server_id,
                image_name: input_image_name,
            }).then(data => {
                setTimeout(() => {
                    message.success({ content: '客户端已接收数据！', key: 'updatable', duration: 2 });
                }, 1000);
                //console.log(data.data.data.data);
                if (!data.data.data.data.message) {
                    notification.open({
                        message: '下载成功！',
                        description:
                            `镜像:${input_image_name}下载成功！`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                    this.setState({
                        visible: false,
                        loading: false,
                        input_image_name: '',
                    });
                    this.props.onFresh();
                } else {
                    notification.open({
                        message: '下载失败！',
                        description:
                            `${data.data.data.data.message}`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                    this.setState({
                        loading: false,
                    });
                }

            });
    }

    handleInput_image_name(e) {
        this.setState({
            input_image_name: e.target.value,
        })
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.send_message();
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const { input_image_name, loading } = this.state;
        return (
            <div>
                <Button type="primary" shape="round" icon={<DownloadOutlined />} onClick={this.showModal}>
                    添加新镜像
                </Button>
                <Modal
                    title="添加新镜像"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={loading}
                >
                    <p>服务器将访问dockerhub搜索并下载镜像</p>
                    <Input placeholder="请输入镜像名字" addonBefore="docker.io" onChange={(e) => this.handleInput_image_name(e)} value={input_image_name} />
                </Modal>
            </div>
        );
    }
}