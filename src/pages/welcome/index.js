import React from 'react';
import 'antd/dist/antd.css';
import { Steps, Col, Row, Spin } from 'antd';
import axios from 'axios';

import welcome_1 from '../../components/welcome/welcome_1'
import welcome_2 from '../../components/welcome/welcome_2'
import welcome_3 from '../../components/welcome/welcome_3'
import welcome_4 from '../../components/welcome/welcome_4'


export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            welcome: false
        };
        this.steps = [
            {
                title: '开始',
                content: welcome_1
            },
            {
                title: '注册',
                content: welcome_2,
            },
            {
                title: '绑定一个服务器',
                content: welcome_3,
            },
            {
                title: '结束',
                content: welcome_4,
            },
        ];
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
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
                        welcome: true,
                    })
                } else {
                    this.setState({
                        welcome: false,
                    })
                    window.location.replace('/')
                }
            });
    }

    render() {
        const { current, welcome } = this.state;
        const { Step } = Steps;
        if (welcome) {
            return (
                <div>
                    <br /><br /><br /><br /><br />
                    <Row gutter={[8, 8]}>
                        <Col span={3} />
                        <Col span={18} >
                            <Steps current={current}>
                                {this.steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">{this.steps[current].content({ onNext: () => this.next(), })}</div>
                        </Col>
                        <Col span={3} />
                    </Row>
                </div>
            );
        } else {
            return (
                <div align="center" style={{ "margin-top": "20%" }}>
                    <Spin size="large" />
                </div>
            );
        }

    }
}