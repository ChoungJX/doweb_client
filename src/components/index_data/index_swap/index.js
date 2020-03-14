import React from 'react';
import { Card, Statistic, Divider } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';






export default function IndexSwapData(props) {
    let used = props.data.memory_swap.used;
    used = used.toFixed(2);
    let total = props.data.memory_swap.total;
    total = total.toFixed(2);
    let free = props.data.memory_swap.free;
    free = free.toFixed(2);

    let percent = used / total * 100;
    percent = percent.toFixed(2)

    return (
        <Card className="site-layout-card" style={{ height: 200, margin: "0 auto" }}>
            <Statistic title="交换空间占用百分比" value={percent} suffix="%" />
            <br />
            <PieChartOutlined />已使用: <b>{used} GB</b>
            <Divider style={{ margin: '4px 0' }} />
            交换空间总量: <b>{total} GB</b>
        </Card>
    )
}