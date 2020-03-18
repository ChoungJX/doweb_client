import React from 'react';
import { Card, Statistic, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';






export default function IndexNetworkData(props) {
    let receive = props.data.network.receive;
    let send = props.data.network.send;
    let last_receive = props.data.network.last_receive;
    let last_send = props.data.network.last_send;

    let download = receive - last_receive;
    let upload = send - last_send
    let download_unit = 'b/s'
    let upload_unit = 'b/s'

    if (download > 1000) {
        download /= 1024;
        download_unit = 'kb/s';
        if (download > 1000) {
            download /= 1024;
            download_unit = 'mb/s';
            if (download > 1000) {
                download /= 1024;
                download_unit = 'gb/s';
            }
        }
    }
    if (upload > 1000) {
        upload /= 1024;
        upload_unit = 'kb/s';
        if (upload > 1000) {
            upload /= 1024;
            upload_unit = 'mb/s';
            if (upload > 1000) {
                upload /= 1024;
                upload_unit = 'gb/s';
            }
        }
    }

    return (
        <Card className="site-layout-card" style={{ height: 200, margin: "0 auto" }}>
            <Statistic
                title="网络接收数据"
                value={download}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix={download_unit}
            />
            <Divider style={{ margin: '10px 0' }} />
            <Statistic
                title="网络发送数据"
                value={upload}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix={upload_unit}
            />
        </Card>
    )
}