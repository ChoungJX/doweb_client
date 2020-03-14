import React from 'react';
import { Card, Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';

const { Paragraph } = Typography;



export default function IndexContainerData(props) {
    let total = 0;
    let running = 0;
    let aaa = props.data.Containers;
    if (aaa) {
        total = props.data.Containers.length;
        running = 0;
        for (let i = 0; i < total; i++) {
            if (props.data.Containers[i].State === "running") {
                running++;
            }
        }
    }
    return (
        <Card size="small" title={<div><AppstoreOutlined spin={true} style={{ fontSize: '21px' }} />   <b>容器</b></div>} style={{ margin: "0 auto" }}>
            <Paragraph>
                <ul>
                    <li>
                        已创建: <b>{total}</b>
                    </li>
                    <br />
                    <li>
                        正在运行: <b>{running}</b>
                    </li>
                </ul>
            </Paragraph>
        </Card>
    )
}