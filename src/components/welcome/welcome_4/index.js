import React from 'react';
import { Link } from 'react-router-dom'

import { Result, Button } from 'antd';


export default function welcome_4(props) {
    return (
        <Result
            status="success"
            title="一切准备就绪"
            subTitle="现在您可以尽情使用了"
            extra={[
                <Link to="/">
                    <Button type="primary" key="console">
                        进入平台
                    </Button>
                </Link>,
            ]}
        />
    )
}