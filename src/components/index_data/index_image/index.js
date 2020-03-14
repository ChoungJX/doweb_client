import React from 'react';
import { Card, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';

const { Paragraph } = Typography;



export default function IndexImageData(props) {
    let total = 0;
    let size = 0;
    let aaa = props.data.Images
    if (aaa) {
        total = props.data.Images.length;
        for (let i = 0; i < total; i++) {
            size += props.data.Images[i].Size;
        }
        size = size / 1024 / 1024 / 1024;
        size = size.toFixed(2);
    }

    return (
        <Card size="small" title={<div><SaveOutlined spin={true} style={{ fontSize: '21px' }} />  <b>镜像</b></div>} style={{ margin: "0 auto" }}>
            <Paragraph>
                <ul>
                    <li>
                        数量: <b>{total}</b>
                    </li>
                    <br />
                    <li>
                        占用空间: <b>{size} GB</b>
                    </li>
                </ul>
            </Paragraph>
        </Card>
    )
}