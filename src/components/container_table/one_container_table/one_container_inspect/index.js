import { CloudUploadOutlined, RedoOutlined, EyeOutlined, FundProjectionScreenOutlined, LoadingOutlined, PlayCircleOutlined, PoweroffOutlined, ReloadOutlined, SnippetsOutlined } from '@ant-design/icons';
import { Badge, Button, Descriptions, Drawer, Input, message, Modal, Skeleton, Space, Spin, Statistic, Timeline, Tooltip } from 'antd';
import axios from 'axios';
import React from 'react';
import ReactJson from 'react-json-view';





export default class ContainerInspect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            loading: false,
            data: {},
            childrenDrawer: false,
            ModalVisible: false,
            ModalLoading: false,
            ModalInputImageName: "",
            ModalInputVersionName: "",

            log_data: {},
            reloading: false,
            max_log_number: 20
        }
    }

    fetch() {
        axios.post('/api',
            {
                api: 'container_inspect',
                server_id: this.props.server_id,
                container_id: this.props.container_id
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

    fetch_log() {
        axios.post('/api',
            {
                api: 'container_log',
                server_id: this.props.server_id,
                container_id: this.props.container_id
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
                    log_data: data.data
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
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            }).catch(err => {
                message.error("请求操作失败！请稍后再试")
                this.setState({
                    loading: false,
                })
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
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            }).catch(err => {
                message.error("请求操作失败！请稍后再试")
                this.setState({
                    loading: false,
                })
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
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                this.setState({
                    loading: false,
                })
                message.success("已向服务器发起请求")
                this.fetch();
                this.props.onFresh();
            }).catch(err => {
                message.error("请求操作失败！请稍后再试")
                this.setState({
                    loading: false,
                })
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
                    this.setState({
                        loading: false,
                    })
                    return;
                }

                let ip = data.data.data.ip;
                let user = data.data.data.user;
                let psw = data.data.data.psw;

                window.open(`/ssh?hostname=${ip}&username=${user}&password=${psw}&command=docker exec -it ${this.props.container_id} /bin/bash`);
                this.setState({
                    loading: false,
                })
            }).catch(err => {
                message.error("请求操作失败！请稍后再试")
                this.setState({
                    loading: false,
                })
            });
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.fetch();
    };

    handleShowChildDrawer = () => {
        this.setState({
            childrenDrawer: true,
        })
        this.fetch_log();
    }

    onChildClose = () => {
        this.setState({
            childrenDrawer: false,
            log_data: {}
        })
    }

    onClose = () => {
        this.setState({
            visible: false,
            data: {},
        });
    };

    showModal = () => {
        this.setState({
            ModalVisible: true,
        })
    }

    handleModalOk = () => {
        this.setState({
            ModalLoading: true
        })
        const { ModalInputImageName, ModalInputVersionName } = this.state;

        if (ModalInputImageName.length < 1 || ModalInputVersionName.length < 1) {
            message.warning("信息没有填写完整！");
            return;
        }

        message.loading({ content: '打包镜像中...', key: 'updatable', duration: 0 });

        axios.post('/api',
            {
                api: 'image_create_from_container',
                server_id: this.props.server_id,
                container_id: this.props.container_id,
                image_name: ModalInputImageName,
                version: ModalInputVersionName
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
                    message.warning({ content: data.data.message, key: 'updatable', duration: 2 });
                    this.setState({
                        ModalLoading: false,
                    })
                    return;
                }

                setTimeout(() => {
                    message.success({ content: '打包成功！', key: 'updatable', duration: 2 });
                }, 1000);

                this.setState({
                    ModalLoading: false,
                    ModalInputImageName: "",
                    ModalInputVersionName: "",
                    ModalVisible: false
                })
            });
    }

    handleModalCancel = () => {
        this.setState({
            ModalVisible: false,
        })
    }

    handleModalInputImageName = (e) => {
        this.setState({
            ModalInputImageName: e.target.value
        })
    }

    handleModalInputVersion = (e) => {
        this.setState({
            ModalInputVersionName: e.target.value
        })
    }

    handlereloadingButton = () => {
        this.setState({
            reloading: "加载中..."
        });
        setTimeout(() => {
            const { max_log_number, log_data } = this.state;
            if (log_data.data.length > max_log_number) {
                this.setState({
                    max_log_number: max_log_number + 20,
                    reloading: false
                })
            } else {
                message.warning("已经加载完了！");
                this.setState({
                    reloading: false
                })
            }
        }, 500);
    }

    render() {
        const { data, loading, reloading, log_data, ModalInputImageName, ModalInputVersionName, max_log_number } = this.state;
        const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;
        let screen_high = document.body.clientHeight;
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
                        width={840}
                    >
                        <Descriptions title="基本信息" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                            <Descriptions.Item span={2} label="ID">{data.Id ? data.Id : ""}</Descriptions.Item>
                            <Descriptions.Item label="名字">
                                {data.Name ?
                                    data.Name.split("/")[1]
                                    :
                                    ""}
                            </Descriptions.Item>
                            <Descriptions.Item label="网络信息">{`${data.NetworkSettings.Networks[`${network_drive}`].IPAddress}(${network_drive})`}</Descriptions.Item>
                            <Descriptions.Item label="状态">
                                {data.State ? data.State.Status === "running" ? <Badge status="processing" text={data.State.Status} /> : <Badge status="error" text={data.State.Status} /> : ""}
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
                                <Tooltip placement="top" title="查看日志">
                                    <Button style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<SnippetsOutlined />} size="large" onClick={() => this.handleShowChildDrawer()} />
                                </Tooltip>
                                <Drawer
                                    title="容器日志"
                                    width={840}
                                    closable={false}
                                    onClose={this.onChildClose}
                                    visible={this.state.childrenDrawer}
                                >
                                    {log_data.status === 0 ?
                                        <div>
                                            <Statistic title="记录日志数" value={log_data.data.length} />
                                            <br />
                                            <Timeline pending={reloading} >
                                                {log_data.data.map((item, index) => {
                                                    if (max_log_number >= index) {
                                                        return (<Timeline.Item>{item}</Timeline.Item>)
                                                    } else {
                                                        return false;
                                                    }
                                                })
                                                }
                                            </Timeline>
                                            <Button type="primary" shape="round" loading={reloading} icon={<RedoOutlined />} onClick={() => this.handlereloadingButton()} size="small">
                                                加载更多
                                            </Button>
                                        </div>
                                        :
                                        <div align="center" style={{ "marginTop": `${screen_high / 2 - 48}px` }}>
                                            <Spin indicator={antIcon} />
                                        </div>
                                    }
                                </Drawer>
                                <Tooltip placement="top" title="启动终端">
                                    {data.State.Status === "running" ?
                                        <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<FundProjectionScreenOutlined />} size="large" onClick={() => this.handelGotoTerminal()} />
                                        :
                                        <Button loading={loading} style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<FundProjectionScreenOutlined />} size="large" disabled />
                                    }

                                </Tooltip>
                                <Tooltip placement="top" title="将该容器打包为镜像">
                                    <Button style={{ marginLeft: 12 }} type="primary" shape="circle" icon={<CloudUploadOutlined />} size="large" onClick={() => this.showModal()} />
                                </Tooltip>
                                <Modal
                                    title="填写镜像信息"
                                    visible={this.state.ModalVisible}
                                    onOk={this.handleModalOk}
                                    confirmLoading={this.state.ModalLoading}
                                    onCancel={this.handleModalCancel}
                                >
                                    <Space direction="vertical" size="large">
                                        <Input addonBefore="请输入镜像名：" value={ModalInputImageName} onChange={(e) => this.handleModalInputImageName(e)} />
                                        <Input addonBefore="请输入版本名：" value={ModalInputVersionName} onChange={(e) => this.handleModalInputVersion(e)} />
                                    </Space>
                                </Modal>
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
                                        <div key={index}>
                                            {item}
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
                        <h3><strong>基本信息</strong></h3>
                        <Skeleton active />
                        <br /><br />
                        <h3><strong>详细参数</strong></h3>
                        <Skeleton active />
                        <br /><br />
                        <h3><strong>原始数据</strong></h3>
                        <Skeleton active />
                    </Drawer>
                </div>
            )
        }

    }
}