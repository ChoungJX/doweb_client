import React from 'react';
import 'antd/dist/antd.css';
import { Button, Popconfirm, notification, Tooltip } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';


export default class ServerDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async delete_server() {
        this.setState({
            loading: true
        })

        await axios.post('/api',
            {
                api: 'server_delete',
                server_id: this.props.server_id,
            }).then(data => {
                this.setState({
                    loading: false,
                })
                notification.open({
                    message: '删除成功！',
                    description:
                        `节点:${this.props.server_id}删除成功！`,
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            });
        this.props.onFresh();
    }

    render() {
        return (
            <Tooltip placement="top" title="删除该服务器">
                <Popconfirm placement="right" title="您确定要删除该节点吗" onConfirm={() => this.delete_server()} okText="是" cancelText="否">
                    <Button type="primary" shape="circle" icon={<DeleteOutlined />} danger />
                </Popconfirm>
            </Tooltip>
        );
    }
}