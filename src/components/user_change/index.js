import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Form, Input, message, Modal, PageHeader, Row, Select } from 'antd';
import axios from 'axios';
import React from 'react';


const { Option } = Select;


export default function UserChangeMount(props) {

    return (
        <UserChange {...props} />
    );
}


class UserChange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: "",
            loading: false
        }
    }


    fetch_search(value) {
        //console.log(value)
        if (value === "") {
            return;
        }
        axios.post('/api',
            {
                api: 'search_user_by_name',
                input: value
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

                this.setState({
                    data: data.data.data
                })
            });
    }

    send_regist(value1) {
        this.setState({
            loading: true
        })
        const { value } = this.state;
        if (value === "") {
            message.error('您没有选择要修改的用户');
            this.setState({
                loading: false
            })
            return;
        }
        axios.post('/api',
            {
                api: 'change_user',
                ...value1,
                id: value
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
                    message.success("信息修改成功！")
                } else if (data.data.status === -1) {
                    message.warning('用户名重复，请重新设置！');
                } else if (data.data.status === -2) {
                    message.error('您的权限不足！');
                } else if (data.data.status === -3) {
                    message.error('不能降级自己的权限！');
                }
                this.setState({
                    loading: false
                })
                window.history.back("/user");
            });
    }

    handleChange(value) {
        //console.log(value);
        this.setState({
            value: value,
        })
    }

    render() {
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };

        const options = this.state.data.map(d => <Option key={d.id}>{d.name}</Option>);
        const { value, loading } = this.state;
        return (
            <div>
                <PageHeader
                    title="用户信息修改"
                    subTitle="修改用户信息"
                />
                <Row>
                    <Col span={4}>
                        <div
                            style={{
                                fontSize: 15
                            }}
                        >
                            请输入需要修改的用户名:
                        </div>
                    </Col>
                    <Col span={20}>
                        <Select
                            suffixIcon={<SearchOutlined />}
                            style={{ width: 200 }}
                            showSearch
                            value={value}
                            defaultActiveFirstOption={false}
                            showArrow={false}
                            filterOption={false}
                            onSearch={value => this.fetch_search(value)}
                            onChange={value => this.handleChange(value)}
                            notFoundContent={null}
                        >
                            {options}
                        </Select>
                    </Col>
                </Row>
                <Divider orientation="left">不修改的部分请留空</Divider>
                <Form
                    style={{
                        width: "300px"
                    }}
                    name="basic"
                    onFinish={(value) => this.send_regist(value)}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="请再次输入密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
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
                            修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}