import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Result, message } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

class WelcomeSignup extends React.Component {
    constructor(props) {
        super(props);
    }

    send_regist(value) {
        axios.post('/welcome_api',
            {
                api: 'create_user',
                ...value
            }).then(data => {
                console.log(data.data)
                if (data.data.status === 0) {
                    this.props.onNext();
                } else {
                    message.info('服务器开小差了，请稍后再试');
                }
            });
    }

    render() {
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 8 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        return (
            <Result
                icon={<SmileOutlined />}
                title="请注册一个管理员用户"
                extra={<Form
                    {...layout}
                    name="basic"
                    onFinish={(value) => this.send_regist(value)}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入你的用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="请再次输入密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认你的密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次输入的密码不匹配');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            下一步
                        </Button>
                    </Form.Item>
                </Form>}
            />

        );
    }
}


export default function welcome_2(props) {
    return (
        <WelcomeSignup onNext={() => props.onNext()} />
    );
}