import { Button, Checkbox, Form, Input, message, Modal, PageHeader } from 'antd';
import axios from 'axios';
import React from 'react';



export default class UserCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    send_regist(value) {
        this.setState({
            loading: true
        })
        axios.post('/api',
            {
                api: 'create_user',
                ...value
            }).then(data => {
                if (data.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    return;
                }

                if (data.data.status === 0) {
                    message.success("用户创建成功！");
                } else if (data.data.status === -1) {
                    message.warning('用户名重复，请重新设置！');
                } else if (data.data.status === -2) {
                    message.error("您的权限不足！无法添加用户！");
                }
                this.setState({
                    loading: false
                })
                window.history.back("/user");
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
        const { loading } = this.state;
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
                        <Button loading={loading} type="primary" htmlType="submit">
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}