import React from 'react';
import 'antd/dist/antd.css';
import {
    Row,
    Col,
    Calendar,
    Spin,
} from 'antd'
import { LoginForm } from '../../components/login_form'
import axios from 'axios';



function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            welcome: false,
        }
    }

    componentDidMount(){
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'ifUsed',
            }).then(data => {
                console.log(data.data)
                if (data.data.status === 0) {
                    window.location.replace('/welcome')
                    this.setState({
                        loading: false,
                        welcome: true,
                    })
                } else {
                    this.setState({
                        loading: false,
                        welcome: false,
                    })
                }
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
                window.location.replace('/welcome')
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
