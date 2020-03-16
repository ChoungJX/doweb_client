import React from 'react';
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Descriptions, Skeleton, PageHeader,Divider } from 'antd';
import axios from 'axios';


export default function ServerInfo(props) {
    let { server_ip } = useParams();

    return (
        <div>
            <PageHeader
                ghost={false}
                title="服务器信息"
                subTitle={`服务器:${server_ip}`}
            >
            </PageHeader>
            <Divider />
            <ServerInfoShow server_ip={server_ip} />
        </div>
    );
}


class ServerInfoShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data1: {},
            data2: {},
        }
    }

    fetch() {
        axios.post('/api',
            {
                api: 'system_infomation',
                server_ip: this.props.server_ip,
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data1: data.data.data.data
                })
            });
        axios.post('/api',
            {
                api: 'system_version',
                server_ip: this.props.server_ip,
            }).then(data => {
                console.log(data.data.data.data)
                this.setState({
                    data2: data.data.data.data
                })
            });
    }

    componentDidMount() {
        this.fetch();
    }

    render() {
        const { data1, data2 } = this.state;
        if (data1.OSType) {
            let mem = data1.MemTotal / 1024 / 1024 / 1024;
            mem = mem.toFixed(2);
            return (
                <div>
                    <Descriptions
                        title="系统信息"
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="系统内核">{data1.OSType}</Descriptions.Item>
                        <Descriptions.Item label="系统名字">{data1.Name}</Descriptions.Item>
                        <Descriptions.Item label="CPU平台">{data1.Architecture}</Descriptions.Item>
                        <Descriptions.Item label="CPU数量">{data1.NCPU}</Descriptions.Item>
                        <Descriptions.Item label="内存总量">
                            {`${mem} GB`}
                        </Descriptions.Item>
                        <Descriptions.Item label="驱动类型">
                            {data1.Driver}
                        </Descriptions.Item>
                        <Descriptions.Item label="详细信息">
                            {`内核版本: ${data1.KernelVersion}`}
                            <br />
                            {`系统版本: ${data1.OperatingSystem}`}
                            <br />
                            {`ID: ${data1.ID}`}
                        </Descriptions.Item>
                    </Descriptions>
                    <br /><br />
                    <Descriptions
                        title="Docker信息"
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    >
                        <Descriptions.Item label="版本">{data2.Version}</Descriptions.Item>
                        <Descriptions.Item span={2} label="构建时间">{data2.BuildTime}</Descriptions.Item>
                        <Descriptions.Item label="api版本">{data2.ApiVersion}</Descriptions.Item>
                        <Descriptions.Item label="适用平台">{data2.Arch}</Descriptions.Item>
                        <Descriptions.Item label="Go语言版本">{data2.GoVersion}</Descriptions.Item>
                    </Descriptions>
                </div>
            );
        } else {
            return (
                <div>
                    <Skeleton active />
                    <Skeleton active />
                    <Skeleton active />
                </div>
            );
        }
    }
}