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
            loading: true
        }
    }

    render() {
        const { Content, Footer } = Layout;
        return (
            <Layout className="layout">
                <AllHeader number={'1'} />
                <Content style={{ padding: '0 50px', marginTop: 64 }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>主页</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Divider orientation="left">系统公告</Divider>
                        <Row justify="center" gutter={[16, 16]}>
                            <Col span={24} >
                                <Alert
                                    message="欢迎来到Docker容器可视化平台"
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
                <Footer style={{ textAlign: 'center' }}><a rel="noopener noreferrer" href="https://github.com/ChoungJX/doweb_server" target="_blank"><GithubOutlined /></a> ChoungJX毕业作品</Footer>
            </Layout>
        )
    }
}