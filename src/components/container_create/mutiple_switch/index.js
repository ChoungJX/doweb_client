import React from 'react';
import 'antd/dist/antd.css';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


export default class MultipleSwitch extends React.Component {
    state = {
        items: [],
        items_value: {},

        input_key: '',
        input_value: '',
        selected: [],
    };

    onKeyChange = event => {
        this.setState({
            input_key: event.target.value,
        });
    }

    onValueChange = event => {
        this.setState({
            input_value: event.target.value,
        });
    };

    onSelectedChange = value => {
        console.log(eval(value));
    }

    addItem = () => {
        const { items, items_value, input_value, input_key } = this.state;
        this.setState({
            items: [...items, `{"${input_key}":"${input_value}"}`],
            input_key: '',
            input_value: '',
        });
    };

    render() {
        const { items, input_key, input_value } = this.state;
        const { Option } = Select;
        return (
            <Select
                mode="multiple"
                style={{ width: '600px' }}
                placeholder={this.props.args}
                onChange={value => this.props.onChange(value)}
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} orientation="left">选项添加</Divider>
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input addonBefore="key" style={{ flex: 'auto' }} value={input_key} onChange={this.onKeyChange} />
                            :
                            <Input addonBefore="value" style={{ flex: 'auto' }} value={input_value} onChange={this.onValueChange} />
                        </div>
                        <div align="right">
                            <a
                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                onClick={this.addItem}
                            >
                                <PlusOutlined /> 添加选项
                            </a>
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