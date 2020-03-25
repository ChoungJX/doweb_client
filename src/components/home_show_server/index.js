import React from 'react';

import { Divider } from 'antd';


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