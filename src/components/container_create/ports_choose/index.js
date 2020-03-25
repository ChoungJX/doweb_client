import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Radio, Select, Button } from 'antd';
import React from 'react';



export default class PortsChoose extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            items_value: {},
            items2: [],

            input_cport: '',
            input_type: 'tcp',
            input_hip: '0.0.0.0',
            input_hport: '',
            selected: [],
        };
    }

    onCportChange = event => {
        this.setState({
            input_cport: event.target.value,
        });
    }

    onHipChange = event => {
        this.setState({
            input_hip: event.target.value,
        });
    }

    onHportChange = event => {
        this.setState({
            input_hport: event.target.value,
        });
    }

    onTypeChange = value => {
        this.setState({
            input_type: value.target.value
        })
    }

    onSelectedChange = value => {
        let temp_list = [];
        for (let i = 0; i < value.length; i++) {
            let one_key = Object.keys(JSON.parse(value[i]))[0]
            temp_list = [...temp_list, `{"${one_key}":{}}`]
        }
        this.props.onChange(value, temp_list)
    }

    addItem = () => {
        const { items, input_cport, input_type, input_hip, input_hport } = this.state;
        this.setState({
            items: [...items, `{"${input_cport}/${input_type}":[{"HostIp":"${input_hip}","HostPort":"${input_hport}"}]}`],
            input_cport: '',
            input_type: 'tcp',
            input_hip: "0.0.0.0",
            input_hport: "",
        });
    };

    render() {
        const { items, input_cport, input_type, input_hip, input_hport } = this.state;
        const { Option } = Select;
        return (
            <Select
                mode="multiple"
                style={{ width: '320px' }}
                placeholder={this.props.args}
                onChange={this.onSelectedChange}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} orientation="left">选项添加</Divider>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            容器端口:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input value={input_cport} placeholder="443" onChange={this.onCportChange} />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            转发类型:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Radio.Group value={input_type} buttonStyle="solid" onChange={this.onTypeChange}>
                                <Radio.Button value="tcp">TCP</Radio.Button>
                                <Radio.Button value="udp">UDP</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            主机IP:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input value={input_hip} placeholder="0.0.0.0" style={{ flex: 'auto' }} onChange={this.onHipChange} />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            主机端口:
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input value={input_hport} placeholder="443" style={{ flex: 'auto' }} onChange={this.onHportChange} />
                        </div>
                        <div align="right">
                            <Button type="link"
                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                onClick={this.addItem}
                            >
                                <PlusOutlined /> 添加选项
                            </Button>
                        </div>
                    </div>
                )}
            >
                {items.map(item => (
                    <Option key={item}>{item}</Option>
                ))}
            </Select>
        );
    }
}