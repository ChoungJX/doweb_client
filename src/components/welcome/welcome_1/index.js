import React from 'react';

import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';


export default function welcome_1(props) {
    return (
        <Result
            icon={<SmileOutlined />}
            title="欢迎来到Docker可视化管理平台"
            extra={<Button type="primary" onClick={() => props.onNext()} >下一步</Button>}
        />
    )
}