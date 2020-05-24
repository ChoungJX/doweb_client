import { ClusterOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Col, Modal, Result, Row, Spin } from 'antd';
import axios from 'axios';
import React from 'react';
import { LoginForm } from '../../components/login_form';


const { confirm } = Modal;



export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            welcome: false,
            login: false,
        }
    }

    componentDidMount() {
        this.fetch();
    }


    fetch() {
        axios.post('/api',
            {
                api: 'ifUsed',
            }).then(data => {
                //console.log(data.data)
                if (data.data.status === 0) {
                    this.setState({
                        loading: false,
                        welcome: true,
                    })
                } else {
                    if (data.data.login) {
                        window.location.replace('/')
                    } else {
                        this.setState({
                            loading: false,
                            welcome: false,
                        })
                    }
                }
            });
    }

    showConfirm() {
        this.setState({
            loading: false,
            welcome: false,
        })
        confirm({
            title: '您尚未注册任何用户或绑定任何服务器',
            icon: <ExclamationCircleOutlined />,
            content: '是否需要进入引导界面进行注册绑定？',
            onOk() {
                window.location.replace('/welcome')
            },
            onCancel() {
            },
        });
    }

    render() {
        const { loading, welcome } = this.state;
        if (loading) {
            return (
                <div align="center" style={{ "marginTop": "20%" }}>
                    <Spin size="large" />
                </div>
            )
        } else {
            if (welcome) {
                this.showConfirm();
                return (<div></div>);
            } else {
                return (
                    <div style={{
                        background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7) ),url(/static/img/1.jpg)`,
                        backgroundSize: "100% 100%",
                        height: "100%",
                        width: "100%"
                    }}>
                        <div style={{
                            height: "25%"
                        }}>

                        </div>
                        <Row align={'middle'} justify="space-between" >
                            <Col span={1} />
                            <Col >
                                <Result
                                    icon={<ClusterOutlined />}
                                    title={<div style={{ color: "white" }}>欢迎来到可视化Docker容器管理系统</div>}
                                />
                            </Col>
                            <Col span={4} />
                            <Col >
                                <LoginForm Login={() => this.props.Login()} />
                            </Col>
                            <Col span={1} />
                        </Row>
                    </div>
                )
            }
        }
    }
}
