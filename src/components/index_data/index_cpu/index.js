import React from 'react';
import { Card, Statistic, Divider } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';






export default function IndexCpuData(props) {
    let used = props.data.cpu.cpu_used
    let number = props.data.cpu.cpu_number
    return (
        <Card className="site-layout-card" style={{ height: 200, margin: "0 auto" }}>
            <Statistic title="CPU占用率" value={used} suffix="%" />
            <Divider style={{ margin: '4px 0' }} />
            CPU核心数量: <b>{number}</b>
        </Card>
    )
}