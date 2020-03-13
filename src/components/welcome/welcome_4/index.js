import React from 'react';
import 'antd/dist/antd.css';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


export default function welcome_4(props) {
    return (
        <Result
            status="success"
            title="一切准备就绪"
            subTitle="现在您可以尽情使用了"
            extra={[
                <Button type="primary" key="console">
                    进入平台
                </Button>,
            ]}
        />
    )
}