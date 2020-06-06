import { ControlTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
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
        let screen_high = document.body.clientHeight;
        if (loading) {
            return (
                <div align="center" style={{ "marginTop": `${screen_high / 2 - 25}px` }}>
                    <Spin size="large" tip="检测登录状态" />
                </div>
            )
        } else {
            if (welcome) {
                this.showConfirm();
                return (<div></div>);
            } else {
                return (
                    <div style={{
                        background: `linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7) ),url(/static/img/6FDB48A6-8CAB-49C9-A1DB-3301D4955D2A.jpeg)`,
                        backgroundSize: "100%",
                        width: "100%",
                        height: `${screen_high}px`
                    }}>
                        <div style={{
                            height: "25%"
                        }}>

                        </div>
                        <Row align={'middle'} justify="space-around" >
                            <Col >
                                <Result
                                    icon={<ControlTwoTone style={{ fontSize: "72px" }} />}
                                    title={<div style={{ color: "white" }}>欢迎来到可视化Docker容器管理系统</div>}
                                />
                            </Col>
                            <Col >
                                <LoginForm Login={() => this.props.Login()} />
                            </Col>
                        </Row>
                    </div>
                )
            }
        }
    }
}
