import { Col, Divider, Modal, PageHeader, Row, Spin } from 'antd';
//import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import IndexContainerData from './index_container';
import IndexCpuData from './index_cpu';
import IndexImageData from './index_image';
import IndexMemoryData from './index_memory';
import IndexNetworkData from './index_network';
import IndexSwapData from './index_swap';
import IndexVolumeData from './index_volume';




export default function IndexData() {
    let { server_id } = useParams();
    return (
        <div>
            <PageHeader
                ghost={false}
                title="总览"
                subTitle={`服务器:${server_id}`}
            >
            </PageHeader>
            <IndexDataControl server_id={server_id} />
        </div>
    );
}

class IndexDataControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                cpu: {
                    cpu_number: 0,
                    cpu_used: 0,
                },
                memory: {
                    total: 0,
                    used: 0,
                    free: 0,
                },
                memory_swap: {
                    total: 0,
                    used: 0,
                    free: 0,
                },
                network: {
                    receive: 0,
                    send: 0,
                    time: 0,
                    last_receive: 0,
                    last_send: 0,
                    last_time: 0,
                }
            },
            data_docker: {},
            flag: 0,
            ifLoaded: false
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.fetch(), 1000);
        this.fetch_docker();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetch() {
        const { flag } = this.state;
        if (flag === 1) {
            return;
        }
        axios.post('/api',
            {
                api: 'check_server_status',
                server_id: this.props.server_id,
            }).then(d => {
                if (d.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    this.setState({ flag: 1 });
                    return;
                }

                const { data } = this.state;
                let data2 = {
                    ...d.data.data.data
                }
                data2.network.last_receive = data.network.receive
                data2.network.last_send = data.network.send
                data2.network.last_time = data.network.time
                this.setState({
                    data: data2,
                    ifLoaded: true
                })
            });
    }

    fetch_docker() {
        axios.post('/api',
            {
                api: 'system_use',
                server_id: this.props.server_id,
            }).then(d => {
                if (d.data.status === -666) {
                    const { flag } = this.state;
                    if (flag === 1) {
                        return;
                    }
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
                    data_docker: d.data.data.data
                })
            });
    }

    callback(key) {
        //console.log(key);
    }


    render() {
        const { data, data_docker, ifLoaded } = this.state
        return (
            <Spin size="large" tip="加载中..." spinning={!ifLoaded}>
                <div>
                    <Divider orientation="left">系统资源统计</Divider>
                    <Row justify="space-around" gutter={[16, 16]}>
                        <Col span={6} >
                            <IndexCpuData data={data} />
                        </Col>
                        <Col span={6} >
                            <IndexMemoryData data={data} />
                        </Col>
                        <Col span={6} >
                            <IndexSwapData data={data} />
                        </Col>
                        <Col span={6} >
                            <IndexNetworkData data={data} />
                        </Col>
                    </Row>
                    <Divider orientation="left">Docker资源统计</Divider>
                    <Row justify="space-around" gutter={[16, 16]}>
                        <Col span={8} >
                            <IndexContainerData data={data_docker} />
                        </Col>
                        <Col span={8} >
                            <IndexImageData data={data_docker} />
                        </Col>
                        <Col span={8} >
                            <IndexVolumeData data={data_docker} />
                        </Col>

                    </Row>
                </div>
            </Spin>
        );
    }
}