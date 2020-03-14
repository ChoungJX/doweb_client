import React from 'react';
import { Card, Typography } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';

const { Paragraph } = Typography;



export default function IndexVolumeData(props) {
    let total = 0;
    let size = 0;
    let aaa = props.data.Volumes
    if (aaa) {
        total = props.data.Volumes.length;
        for (let i = 0; i < total; i++) {
            size += props.data.Volumes[i].UsageData.Size
        }
        size = size / 1024 / 1024
        if (size > 1000) {
            size = size / 1024
            size = size.toFixed(2);
            size = `${size} GB`
        }else{
            size = size.toFixed(2);
            size = `${size} MB`
        }
        
    }

    return (
        <Card size="small" title={<div><FolderOpenOutlined spin={true} style={{ fontSize: '21px' }} />  <b>卷</b></div>} style={{ margin: "0 auto" }}>
            <Paragraph>
                <ul>
                    <li>
                        数量: <b>{total}</b>
                    </li>
                    <br />
                    <li>
                        占用空间: <b>{size}</b>
                    </li>
                </ul>
            </Paragraph>
        </Card>
    )
}