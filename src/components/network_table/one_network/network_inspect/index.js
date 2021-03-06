import { Button, Descriptions, Drawer, message, Modal, Skeleton, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view';



export default class NetworkInspect extends React.Component {
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
                api: 'network_inspect',
                server_id: this.props.server_id,
                network_id: this.props.network_id
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
                    <Tooltip placement="top" title="查看该网络">
                        <Button type="link" onClick={this.showDrawer}>{this.props.network_name}</Button>
                    </Tooltip>
                    <Drawer
                        title="网络信息"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={720}
                    >
                        <Descriptions title="基本信息" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="ID">{data.Id ? data.Id : ""}</Descriptions.Item>
                            <Descriptions.Item label="名字">{data.Name}</Descriptions.Item>
                            <Descriptions.Item label="网络类型">{data.Driver}</Descriptions.Item>
                            <Descriptions.Item span={2} label="创建时间">{data.Created}</Descriptions.Item>
                            <Descriptions.Item span={2} label="详情">
                                {
                                    data.IPAM.Config.map((item, index) =>
                                        <div key={index}>
                                            {`网关: ${item.Gateway}`}
                                            <br />
                                            {`网段: ${item.Subnet}`}
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
                    <Tooltip placement="top" title="查看该网络">
                        <Button type="link" onClick={this.showDrawer}>{this.props.network_name}</Button>
                    </Tooltip>
                    <Drawer
                        title="网络信息"
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