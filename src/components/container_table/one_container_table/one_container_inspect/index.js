import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Descriptions, Badge, Tooltip } from 'antd';
import { EyeOutlined, PlayCircleOutlined, ReloadOutlined, PoweroffOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import axios from 'axios';





export default class ContainerInspect extends React.Component {
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
                api: 'container_inspect',
                server_ip: this.props.server_ip,
                container_id: this.props.container_id
            }).then(data => {
                console.log(data.data.data.data)
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
        });
    };

    render() {
        const { data } = this.state;
        if (data.NetworkSettings) {
            const network_drive = Object.keys(data.NetworkSettings.Networks)[0]
            return (
                <div>
                    <Tooltip placement="top" title="查看该容器">
                        <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={this.showDrawer} />
                    </Tooltip>
                    <Drawer
                        title="容器信息"
                        placement="right"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                        width={720}
                    >
                        <Descriptions title="基本信息" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="ID">{data.Id ? data.Id : ""}</Descriptions.Item>
                            <Descriptions.Item label="名字"> {data.Name ? data.Name : ""} </Descriptions.Item>
                            <Descriptions.Item label="网络信息">{`${data.NetworkSettings.Networks[`${network_drive}`].IPAddress}(${network_drive})`}</Descriptions.Item>
                            <Descriptions.Item label="状态">
                                {data.State ? data.State.Status == "running" ? <Badge status="processing" text={data.State.Status} /> : <Badge status="error" text={data.State.Status} /> : ""}
                            </Descriptions.Item>
                            <Descriptions.Item label="创建时间"> {data.Created.split(".")[0]} </Descriptions.Item>
                            <Descriptions.Item span={2} label="操作">
                                <Tooltip placement="top" title="启动容器">
                                    <Button type="primary" shape="circle" icon={<PlayCircleOutlined />} size="large" />
                                </Tooltip>
                                <Tooltip placement="top" title="重启容器">
                                    <Button style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<ReloadOutlined />} size="large" />
                                </Tooltip>
                                <Tooltip placement="top" title="结束容器">
                                    <Button style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<PoweroffOutlined />} size="large" danger />
                                </Tooltip>
                                <Tooltip placement="top" title="启动终端">
                                    <Button style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<FundProjectionScreenOutlined />} size="large" />
                                </Tooltip>
                            </Descriptions.Item>
                        </Descriptions>
                        <br /><br />
                        <Descriptions title="详细参数" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="镜像">{data.Config.Image}</Descriptions.Item>
                            <Descriptions.Item label="端口映射信息">
                                {Object.keys(data.NetworkSettings.Ports).map((item, index) =>
                                    data.NetworkSettings.Ports[`${item}`].map((item2, index2) =>
                                        `${item2.HostIp}:${item2.HostPort} => ${item}`
                                    )
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="启动参数">
                                {data.Config.Cmd ? data.Config.Cmd.map((item, index) =>
                                    item
                                ) : ""}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="环境变量">
                                {
                                    data.Config.Env.map((item, index) =>
                                        item
                                    )
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Drawer>
                </div>
            );
        } else {
            return (
                <Tooltip placement="top" title="查看该容器">
                    <Button type="primary" shape="circle" icon={<EyeOutlined />} onClick={this.showDrawer} />
                </Tooltip>
            )
        }

    }
}