import { GithubOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Col, Divider, Layout, Row } from 'antd';
import React from 'react';
import { AllHeader } from '../../components/header';
import ServerTableHook from '../../components/server_table';
import './index.css';



export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            screen_high: 1080
        }
    }

    componentWillMount() {
        this.setState({
            screen_high: document.body.clientHeight
        })
    }

    render() {
        const { Content, Footer } = Layout;
        const { screen_high } = this.state
        return (
            <Layout className="layout">
                <AllHeader number={'1'} />
                <Content style={{ padding: '0 50px 0 50px', marginTop: 64, minHeight: screen_high - 64 - 70 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content" style={{ height: screen_high - 64 - 70 - 50 - 16 }}>
                        <Divider orientation="left">欢迎</Divider>
                        <Row justify="center" gutter={[16, 16]}>
                            <Col span={24} >
                                <Alert
                                    message="欢迎来到可视化Docker容器管理系统"
                                    description="请选择一个服务器来进行操作。您也可以添加新的服务器或者删除一个服务器"
                                    type="info"
                                    showIcon
                                />
                            </Col>
                        </Row>
                        <Divider orientation="left">进入服务器</Divider>
                        <ServerTableHook />
                        <Divider />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', height: "70px" }}><a rel="noopener noreferrer" href="https://github.com/ChoungJX/doweb_server" target="_blank"><GithubOutlined /></a> ChoungJX毕业作品</Footer>
            </Layout>
        )
    }
}