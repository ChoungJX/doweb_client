import React from 'react';

import { Button, notification } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';

export default class NetworkDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
        }
    }

    async delete_network() {
        this.setState({
            loading:true
        })
        for (let i = 0; i < this.props.selected.length; i++) {
            await axios.post('/api',
                {
                    api: 'network_delete',
                    server_id: this.props.server_id,
                    network_id: this.props.selected[i],
                }).then(data => {
                    //console.log(data.data.data.data);
                    if (!data.data.data.data.message) {
                        notification.open({
                            message: '删除成功！',
                            description:
                                `网络删除成功！`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    } else {
                        notification.open({
                            message: '删除失败！',
                            description:
                                `${data.data.data.data.message}`,
                            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                        });
                    }
                });
        }
        this.setState({
            loading:false
        })
        this.props.onFresh();
    }

    render() {
        const {loading} = this.state
        return (
            <Button
                type="primary"
                shape="round"
                icon={<DeleteOutlined />}
                danger
                disabled={this.props.disabled}
                loading={loading}
                onClick={() => this.delete_network()}
            >
                删除所选网络
            </Button>
        );
    }
}