import React from 'react';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import {
    Row,
    Col,
    Calendar,
    Spin,
    Modal,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { LoginForm } from '../../components/login_form'
import axios from 'axios';

const { confirm } = Modal;

function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}


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
                console.log(data.data)
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
                window.location.replace('/#/welcome')
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
                    <div>
                        <Row>
                            <Col span={24}><br></br></Col>
                        </Row>
                        <Row align={'middle'}>
                            <Col span={1} />
                            <Col span={12}>
                                <Calendar onPanelChange={onPanelChange} />
                            </Col>
                            <Col span={9}>
                                <LoginForm Login={() => this.props.Login()} />
                            </Col>
                            <Col span={2} />
                        </Row>
                    </div>
                )
            }
        }
    }
}
