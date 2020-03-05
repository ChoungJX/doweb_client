import React from 'react';
import 'antd/dist/antd.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';


import { Form, Input, Button, Checkbox, message, } from 'antd';



export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
        this.layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 12 },
        };
        this.tailLayout = {
            wrapperCol: { offset: 8, span: 12 },
        };
    }

    async onFinish(values) {
        console.log(values);
        this.setState({
            loading: true,
        });

        await axios.post('/api',
            {
                api: 'login',
                username: values.username,
                password: values.password,
            }).then(data => {
                if (data.data.status === 0) {
                    window.location.replace('/control')
                } else {
                    message.info('用户或密码错误！');
                }
            });

        this.setState({
            loading: false,
        });
    }

    onFinishFailed() {
        //console.log('Failed:');
    }

    render() {
        return (
            <div>
                <Form
                    {...this.layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={values => this.onFinish(values)}
                    onFinishFailed={() => this.onFinishFailed()}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item {...this.tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>记住我</Checkbox>
                    </Form.Item>

                    <Form.Item {...this.tailLayout}>
                        <Button loading={this.state.loading} type="primary" htmlType="submit">
                            登录
            </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}