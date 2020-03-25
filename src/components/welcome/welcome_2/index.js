import { SmileOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, message, Result, Row, Spin } from 'antd';

import axios from 'axios';
import React from 'react';
import { LoginForm } from '../../login_form';


class WelcomeSignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            ifUser: false,
        }
    }

    send_regist(value) {
        this.setState({
            loading: true,
        })
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
                    this.setState({
                        loading: false,
                    })
                }
            }).catch(err => {
                console.log(err);
                message.error('服务器开小差了，请稍后再试');
                this.setState({
                    loading: false,
                })
            });
    }

    componentDidMount() {
        this.fetch();
    }

    fetch() {
        axios.post('/welcome_api',
            {
                aaa: 'aaa',
            }).then(data => {
                console.log(data.data)
                if (data.data.status === -2) {
                    this.setState({
                        loading: false,
                        ifUser: true
                    })
                } else {
                    this.setState({
                        loading: false,
                        ifUser: false
                    })
                }
            }).catch(err => {
                console.log(err);
                message.error('服务器开小差了，请稍后再试');
                this.setState({
                    loading: false,
                })
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
        const { loading, ifUser } = this.state;
        if (!loading) {
            if (ifUser) {
                return (
                    <Result
                        icon={<SmileOutlined />}
                        title="该服务器已经创建了管理员账户，请登录进行操作"
                        extra={
                            <Row>
                                <Col span={8} />
                                <Col span={4}>
                                    <LoginForm {...layout} Login={() => this.props.onNext()} />
                                </Col>
                            </Row>
                        }
                    />
                )
            } else {
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
                                <Button loading={loading} type="primary" htmlType="submit">
                                    下一步
                            </Button>
                            </Form.Item>
                        </Form>}
                    />

                );
            }
        } else {
            return (
                <div align="center" style={{ "marginTop": "20%" }}>
                    <Spin size="large" />
                </div>
            )
        }


    }
}


export default function welcome_2(props) {
    return (
        <WelcomeSignup onNext={() => props.onNext()} />
    );
}