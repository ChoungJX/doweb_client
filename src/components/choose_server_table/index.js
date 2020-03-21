import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Table, Button, Card } from 'antd';
import { ControlTwoTone } from '@ant-design/icons';
import axios from 'axios';


function IntoButton(props) {
    let { url } = useRouteMatch();
    return (
        <Link to={`${url}/${props.server_id}`} >
            <Button type="primary" shape="circle" icon={<ControlTwoTone />} />
        </Link>
    );
}

export class CommonTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
        }

        this.columns = [
            {
                title: '节点名字',
                dataIndex: 'server_name',
                key: 'name',
            },
            {
                title: '节点ip',
                dataIndex: 'server_ip',
                key: 'age',
            },
            {
                title: '进入',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <IntoButton server_id={record.id} />
                    </span>
                ),
            },
        ];
    }

    componentDidMount() {
        this.fetch();
    }

    handleRefresh() {
        this.fetch();
    }

    fetch() {
        axios.post('/api',
            {
                api: 'server_info',
            }).then(data => {
                console.log(data.data.data)
                this.setState({
                    data: data.data.data,
                    loading: false,
                })
            });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <div>
                <Card title="请选择服务器" >
                    <Table loading={loading} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}