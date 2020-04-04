import { GithubOutlined, SlidersTwoTone } from '@ant-design/icons';
import { Breadcrumb, Layout, message, Result } from 'antd';
import axios from 'axios';
import React from 'react';
import { AllHeader } from '../../components/header';
import './index.css';


export default class AboutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            version: "loading..."
        }
    }

    componentDidMount() {
        axios.get("/version", {
            api: "version"
        }).then(d => {
            if (d.data.status === 0) {
                this.setState({ version: d.data.version });
            } else {
                message.warning(d.data.message);
            }
        }).catch(
            err => {
                message.error("获取版本信息失败！")
            }
        )
    }

    render() {
        const { version } = this.state;

        const { Content, Footer } = Layout;
        return (
            <Layout className="layout">
                <AllHeader number={'3'} />
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>关于</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Result
                            icon={<SlidersTwoTone />}
                            title="Docker容器可视化管理平台"
                            subTitle={<div>客户端版本号:<b>{version}</b></div>}
                            extra={<a href="https://github.com/ChoungJX/doweb_server" rel="noopener noreferrer" target="_blank">
                                点击访问github页面
                            </a>}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}><a rel="noopener noreferrer"  href="https://github.com/ChoungJX/doweb_server" target="_blank"><GithubOutlined /></a> ChoungJX毕业作品</Footer>
            </Layout>
        )
    }
}