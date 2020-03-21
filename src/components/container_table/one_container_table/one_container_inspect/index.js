import React from 'react';
import 'antd/dist/antd.css';
import { Drawer, Button, Descriptions, Badge, Tooltip, Skeleton, message } from 'antd';
import { EyeOutlined, PlayCircleOutlined, ReloadOutlined, PoweroffOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';
import axios from 'axios';





export default class ContainerInspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            data: {}
        }
    }

    fetch() {
        axios.post('/api',
            {
                api: 'container_inspect',
                server_id: this.props.server_id,
                container_id: this.props.container_id
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data: data.data.data.data
                })
            });
    }

    handleStart() {
        this.setState({
            loading: true,
        })
        axios.post('/api',
            {
                api: 'container_start',
                server_id: this.props.server_id,
                container_id: this.props.container_id
            }).then(data => {
                console.log(data.data.data)
                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            });
    }

    handleRestart() {
        this.setState({
            loading: true,
        })
        axios.post('/api',
            {
                api: 'container_restart',
                server_id: this.props.server_id,
                container_id: this.props.container_id
            }).then(data => {
                console.log(data.data.data)
                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            });
    }

    handleStop() {
        this.setState({
            loading: true,
        })
        axios.post('/api',
            {
                api: 'container_stop',
                server_id: this.props.server_id,
                container_id: this.props.container_id
            }).then(data => {
                console.log(data.data.data)
                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            });
    }

    handelGotoTerminal() {
        this.setState({
            loading: true,
        })
        axios.post('/api',
            {
                api: 'server_ssh_info',
                server_id: this.props.server_id,
                base64: true,
            }).then(data => {
                console.log(data.data.data)
                let ip = data.data.data.ip;
                let user = data.data.data.user;
                let psw = data.data.data.psw;

                window.location.replace(`/ssh?hostname=${ip}&username=${user}&password=${psw}&command=docker exec -it ${this.props.container_id} /bin/bash`);
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
        const { data, loading } = this.state;
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
                                    <Button loading={loading} type="primary" shape="circle" icon={<PlayCircleOutlined />} size="large" onClick={() => this.handleStart()} />
                                </Tooltip>
                                <Tooltip placement="top" title="重启容器">
                                    <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<ReloadOutlined />} size="large" onClick={() => this.handleRestart()} />
                                </Tooltip>
                                <Tooltip placement="top" title="结束容器">
                                    <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<PoweroffOutlined />} size="large" danger onClick={() => this.handleStop()} />
                                </Tooltip>
                                <Tooltip placement="top" title="启动终端">
                                    {data.State.Status == "running" ?
                                        <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<FundProjectionScreenOutlined />} size="large" onClick={() => this.handelGotoTerminal()} />
                                        :
                                        <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<FundProjectionScreenOutlined />} size="large" disabled />
                                    }

                                </Tooltip>
                            </Descriptions.Item>
                        </Descriptions>
                        <br /><br />
                        <Descriptions title="详细参数" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="镜像">{data.Config.Image}</Descriptions.Item>
                            <Descriptions.Item label="端口映射信息">
                                {data.NetworkSettings.Ports ? Object.keys(data.NetworkSettings.Ports).map((item, index) =>
                                    data.NetworkSettings.Ports[`${item}`] ? data.NetworkSettings.Ports[`${item}`].map((item2, index2) =>
                                        <div>
                                            {`${item2.HostIp}:${item2.HostPort} => ${item}`}
                                            <br /><br />
                                        </div>
                                    ) : item
                                ) : ""}
                            </Descriptions.Item>
                            <Descriptions.Item label="启动参数">
                                {data.Config.Cmd ? data.Config.Cmd.map((item, index) =>
                                    item
                                ) : ""}
                            </Descriptions.Item>
                            <Descriptions.Item span={2} label="环境变量">
                                {
                                    data.Config.Env.map((item, index) =>
                                        <div>
                                            {item}
                                            <br /><br />
                                        </div>
                                    )
                                }
                            </Descriptions.Item>
                        </Descriptions>
                    </Drawer>
                </div>
            );
        } else {
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
                        <Skeleton active />
                        <br /><br />
                        <Skeleton active />
                    </Drawer>
                </div>
            )
        }

    }
}