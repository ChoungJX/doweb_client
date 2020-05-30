import { Modal, Select, Spin } from 'antd';
import axios from 'axios';
import React from 'react';




export default class ContainerSearchImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            items: [],
            server_id: this.props.server_id,
        }
    }

    componentDidMount(props) {
        this.get_image_list()
    }

    get_image_list() {
        this.setState({
            items: [],
            disabled: true,
        });
        const { server_id } = this.state
        axios.post('/api',
            {
                api: 'image_info',
                server_id: server_id,
            }).then(data => {
                if (data.data.status === -666) {
                    Modal.error({
                        title: '错误：登录已经失效！',
                        content: '请重新登录！',
                        onOk() {
                            window.location.replace("/")
                        },
                    });
                    return;
                }
                this.setState({
                    items: data.data.data.data,
                })
            });
        this.setState({
            disabled: false,
        })
    }

    handleValue(value) {
        this.props.onChange(value);
    }

    render() {
        const { items, disabled } = this.state;
        const { Option } = Select;
        return (
            <Select
                style={{ width: '450px' }}
                labelInValue
                notFoundContent={<Spin size="small" />}
                placeholder="查看镜像列表"
                disabled={disabled ? true : false}
                onChange={value => this.handleValue(value)}
                dropdownRender={menu => (
                    <div>
                        {menu}
                    </div>
                )}
            >
                {items.map(d => (
                    <Option key={d.Id} value={d.RepoTags[0]}>{d.RepoTags.join(" | ")}</Option>
                ))}
            </Select>
        )
    }
}