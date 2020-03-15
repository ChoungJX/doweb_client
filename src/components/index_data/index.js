import React from 'react';
import { useParams } from 'react-router-dom'
import { Row, Col, Divider } from 'antd'
import 'antd/dist/antd.css';
//import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import axios from 'axios';

import IndexCpuData from './index_cpu'
import IndexMemoryData from './index_memory'
import IndexSwapData from './index_swap'
import IndexNetworkData from './index_network'
import IndexContainerData from './index_container'
import IndexImageData from './index_image'
import IndexVolumeData from './index_volume'


export default function IndexData() {
    let { server_ip } = useParams();
    return (
        <div>
            <IndexDataControl server_ip={server_ip} />
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
                    last_receive: 0,
                    last_send: 0
                }
            },
            data_docker: {}
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
        axios.post('/api',
            {
                api: 'check_server_status',
                server_ip: this.props.server_ip,
            }).then(d => {
                const { data } = this.state;
                let data2 = {
                    ...d.data.data.data
                }
                data2.network.last_receive = data.network.receive
                data2.network.last_send = data.network.send
                this.setState({
                    data: data2
                })
            });
    }

    fetch_docker() {
        axios.post('/api',
            {
                api: 'system_use',
                server_ip: this.props.server_ip,
            }).then(d => {
                console.log(d.data.data.data);
                this.setState({
                    data_docker: d.data.data.data
                })
            });
    }

    callback(key) {
        console.log(key);
    }


    render() {
        const { data, data_docker } = this.state
        return (
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
        );
    }
}