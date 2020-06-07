import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Modal } from 'antd';
import axios from 'axios';
import React from 'react';






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

    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] === variable) { return pair[1]; }
        }
        return (false);
    }

    componentDidMount() {
        if (this.getQueryVariable("autologin") === "1") {
            axios.post('/api',
                {
                    api: 'login',
                    username: this.getQueryVariable("username"),
                    password: this.getQueryVariable("password"),
                }).then(data => {
                    //console.log(data.data)
                    if (data.data.status === 0) {
                        this.props.Login()
                    } else {
                        Modal.warning({
                            title: '登录失败',
                            content: '用户名或密码错误！',
                        });
                    }
                });
            Modal.info({
                title: '检测到登录参数',
                content: '即将进行自动登录。',
            });
        }
    }

    async onFinish(values) {
        //console.log(values);
        this.setState({
            loading: true,
        });

        await axios.post('/api',
            {
                api: 'login',
                username: values.username,
                password: values.password,
            }).then(data => {
                //console.log(data.data)
                if (data.data.status === 0) {
                    this.props.Login()
                } else {
                    Modal.warning({
                        title: '登录失败',
                        content: '用户名或密码错误！',
                    });
                }
            });
        this.setState({
            loading: false,
        });
    }

    onFinishFailed() {
        Modal.warning({
            title: '登录失败',
            content: '连接服务器失败！',
        });
    }

    render() {
        return (
            <div>
                <Card title="登录系统" style={{ width: 400, boxShadow: "2px 4px 6px #123" }}>
                    <Form
                        {...this.props.layout}
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
                        <Form.Item {...this.tailLayout}>
                            <Button loading={this.state.loading} type="primary" htmlType="submit">
                                登录
            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}