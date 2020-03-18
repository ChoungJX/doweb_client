import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';

import { PageHeader, Form, Input, Button, Checkbox, message } from 'antd';

export default class UserCreate extends React.Component {

    send_regist(value) {
        console.log(value)
        axios.post('/api',
            {
                api: 'create_user',
                ...value
            }).then(data => {
                console.log(data.data)
                if (data.data.status === 0) {
                    window.location.replace('/#/user')
                } else {
                    message.info('用户名重复，请重新设置！');
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
            <div>
                <PageHeader
                    title="用户创建"
                    subTitle="创建新用户"
                />
                <Form
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
                    <Form.Item {...tailLayout} name="ifadmin" valuePropName="checked">
                        <Checkbox>是否设置为管理员</Checkbox>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}