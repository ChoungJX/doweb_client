import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu, message, notification } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';



export default class OneContainerActionButton extends React.Component {
    constructor(props) {
        super(props);

        this.menu = (
            <Menu onClick={(e) => this.handleMenuClick(e)}>
                <Menu.Item key="0">
                    <Link to={`${this.props.url}/create`}>创建新容器</Link>
                </Menu.Item>
                <Menu.Item key="1">重启选中容器</Menu.Item>
                <Menu.Item key="2">停止选中容器</Menu.Item>
                <Menu.Item key="3">删除选中容器</Menu.Item>
                <Menu.Item key="4">删除已停止容器</Menu.Item>
            </Menu>
        );
    }

    async handleMenuClick(e) {
        this.props.onLoading();
        if (e.key === '4') {
            await axios.post('/api',
                {
                    api: 'container_delete_stoped',
                    server_id: this.props.server_id,
                }).then(data => {
                    //console.log(data.data);
                    notification.open({
                        message: '删除成功！',
                        description:
                            `容器删除成功！`,
                        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    });
                });
            this.props.onFresh();
            return;
        } else if (e.key === '0') {
            this.props.onFresh();
            return;
        }
        if (this.props.selected.length === 0) {
            message.error('您没有选中任何容器');
            this.props.onFresh();
            return;
        }
        if (e.key === '1') {
            for (let i = 0; i < this.props.selected.length; i++) {
                await axios.post('/api',
                    {
                        api: 'container_restart',
                        server_id: this.props.server_id,
                        container_id: this.props.selected[i],
                    }).then(data => {
                        //console.log(data.data);
                        notification.open({
                            message: '重启成功！',
                            description:
                                `容器:${this.props.selected[i]}重启成功！`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    });
            }
        } else if (e.key === '2') {
            for (let i = 0; i < this.props.selected.length; i++) {
                await axios.post('/api',
                    {
                        api: 'container_stop',
                        server_id: this.props.server_id,
                        container_id: this.props.selected[i],
                    }).then(data => {
                        //console.log(data.data);
                        notification.open({
                            message: '停止成功！',
                            description:
                                `容器:${this.props.selected[i]}停止成功！`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    });
            }
        } else if (e.key === '3') {
            for (let i = 0; i < this.props.selected.length; i++) {
                await axios.post('/api',
                    {
                        api: 'container_delete',
                        server_id: this.props.server_id,
                        container_id: this.props.selected[i],
                    }).then(data => {
                        //console.log(data.data);
                        notification.open({
                            message: '删除成功！',
                            description:
                                `容器:${this.props.selected[i]}删除成功！`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    });
            }
        }
        this.props.onFresh();
    }

    render() {
        return (
            <div>
                <Dropdown overlay={this.menu}>
                    <Button disabled={this.props.disabled} loading={this.props.loading}>
                        快捷操作 <DownOutlined />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}