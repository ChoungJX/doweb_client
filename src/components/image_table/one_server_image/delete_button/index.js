import React from 'react';

import { Button, notification } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import axios from 'axios';


export default class ImageDeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false,
        }
    }

    async delete_image() {
        this.setState({
            loading:true
        })
        for (let i = 0; i < this.props.selected.length; i++) {
            await axios.post('/api',
                {
                    api: 'image_delele',
                    server_id: this.props.server_id,
                    image_id: this.props.selected[i],
                }).then(data => {
                    //console.log(data.data.data.data);
                    if (!data.data.data.data.message) {
                        notification.open({
                            message: '删除成功！',
                            description:
                                `镜像删除成功！`,
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
                onClick={() => this.delete_image()}
            >
                删除所选镜像
            </Button>
        );
    }
}