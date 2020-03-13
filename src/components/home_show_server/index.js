import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Divider } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';


export default class ServerTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    render() {
        return (
            <div>
                <Divider orientation="left">Left Text</Divider>
            </div>
        )
    }
}