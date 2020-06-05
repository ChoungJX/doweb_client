import { Button, Descriptions, Drawer, message, Modal, Skeleton, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view';



export default class ImageInspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {}
        }
    }

    fetch() {
        axios.post('/api',
            {
                api: 'image_inspect',
                server_id: this.props.server_id,
                image_id: this.props.image_id
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
                    data: data.data.data.data
                })
            });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.fetch();
    };

    onClose = () => {
        this.setState({
            visible: false,
            data: {},
        });
    };

    render() {
        const { data } = this.state;
        if (data.Id) {
            return (
                <div>
                    <Tooltip placement="top" title="查看该镜像">
                        <Button type="link" onClick={this.showDrawer}>{this.props.image_id}</Button>
                    </Tooltip>
                    <Drawer
                        title="镜像信息"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={840}
                    >
                        <Descriptions title="基本信息" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="ID">{data.Id ? data.Id : ""}</Descriptions.Item>
                            <Descriptions.Item label="名字"><div>{data.RepoTags.map((item, index) =>
                                <div>{item}<br /><br /></div>
                            )}</div></Descriptions.Item>
                            <Descriptions.Item label="Docker版本">{data.DockerVersion}</Descriptions.Item>
                            <Descriptions.Item span={2} label="构建时间">{data.Created}</Descriptions.Item>
                            <Descriptions.Item label="构建平台">{data.Architecture}</Descriptions.Item>
                            <Descriptions.Item label="适用系统">{data.Os}</Descriptions.Item>
                            <Descriptions.Item label="镜像结构">
                                {
                                    data.RootFS.Layers.map((item, index) =>
                                        <div key={index}>
                                            {`${index}: ${item}`}
                                            <br /><br />
                                        </div>
                                    )
                                }
                            </Descriptions.Item>
                        </Descriptions>
                        <br /><br />
                        <h3><strong>原始数据</strong></h3>
                        <ReactJson src={data} />
                    </Drawer>
                </div>
            );
        } else {
            return (
                <div>
                    <Tooltip placement="top" title="查看该镜像">
                        <Button type="link" onClick={this.showDrawer}>{this.props.image_id}</Button>
                    </Tooltip>
                    <Drawer
                        title="镜像信息"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={720}
                    >
                        <h3><strong>基本信息</strong></h3>
                        <Skeleton active />
                        <h3><strong>原始数据</strong></h3>
                        <Skeleton active />
                    </Drawer>
                </div>
            )
        }

    }
}