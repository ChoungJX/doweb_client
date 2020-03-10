import React from 'react';
import 'antd/dist/antd.css';
import { Select, Spin } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';
import axios from 'axios';



export default class ContainerSearchImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            items: [],
            server_ip: this.props.server_ip,
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
        const { server_ip } = this.state
        axios.post('/api',
            {
                api: 'image_info',
                server_ip: server_ip,
            }).then(data => {
                console.log(data.data.data.data);
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
        const { items, disabled, value, } = this.state;
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
                    <Option key={d.Id}>{d.RepoTags}</Option>
                ))}
            </Select>
        )
    }
}