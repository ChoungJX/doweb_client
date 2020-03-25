import React from 'react';
import { Card, Statistic, Divider } from 'antd';
import { PieChartOutlined, HddOutlined } from '@ant-design/icons';

import '../index.css';






export default function IndexMemoryData(props) {
    let used = props.data.memory.used;
    used = used.toFixed(2);
    let total = props.data.memory.total;
    total = total.toFixed(2);

    let percent = used / total * 100;
    percent = percent.toFixed(2)

    return (
        <Card className="site-layout-card" style={{ height: 200, margin: "0 auto" }}>
            <Statistic title="内存占用百分比" value={percent} suffix="%" />
            <br />
            <PieChartOutlined />  已使用: <b>{used} GB</b>
            <Divider style={{ margin: '4px 0' }} />
            <HddOutlined />  内存总量: <b>{total} GB</b>
        </Card>
    )
}