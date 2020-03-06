import React from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Table, Button, notification, Popconfirm, Modal, Input } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, SmileOutlined, FormOutlined } from '@ant-design/icons';


class OneImageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 8,
                current: 1,
            },
            server_ip: this.props.server_ip,
        }
        this.columns = [
            {
                title: '镜像名字',
                dataIndex: 'name',
                width: '50%',
            },
            {
                title: '操作',
                dataIndex: "tags",
                render: (text, record, index) => {
                    return (
                        <span>
                            <DeleteImageButton
                                server_ip={this.props.server_ip}
                                id={record.id}
                                onClick={() => this.handleUpdate()}
                            />
                        </span>
                    )
                }
            }
        ]
    }

    componentDidMount() {
        const { pageSize, current } = this.state.pagination;
        this.fetch({
            page: current,
            results: pageSize,
        })
    }

    handleUpdate() {
        const { pageSize, current } = this.state.pagination;
        this.fetch({
            page: current,
            results: pageSize,
        })
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
        });
    };

    fetch = (params = {}) => {
        const { server_ip } = this.state;
        this.setState({ loading: true });
        axios.post('/api',
            {
                api: 'server_image_info',
                page_current: params.page,
                need: params.results,
                server_ip: server_ip,
            }).then(data => {
                const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.total;
                this.setState({
                    loading: false,
                    data: data.data.data,
                    pagination,
                });
            });
    };

    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}

class AddImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            input_value: '',
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    async handleOk() {
        this.setState({ loading: true });

        const { input_value } = this.state;
        await axios.post('/api',
            {
                api: 'image_add',
                server_ip: this.props.server_ip,
                name: input_value
            }).then(data => {
                //message.info('删除成功!');
                notification.open({
                    message: '添加成功!',
                    description:
                        '镜像:' + data.data.id + '  添加成功!',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            });
        this.props.onClick();
        this.setState({ loading: false, visible: false });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleInput(e) {
        this.setState({
            input_value: e.target.value
        })
    }

    render() {
        const { visible, loading } = this.state;
        return (
            <span>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<AppstoreAddOutlined />}
                    onClick={() => this.showModal()}
                />
                <Modal
                    visible={visible}
                    title="镜像添加"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            返回
                    </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk()}>
                            提交
                    </Button>,
                    ]}
                >
                    <p>你可以从docker官方镜像网站查询镜像名字</p>
                    <p>
                        <Input
                            size="large"
                            placeholder="请输入镜像名字..."
                            prefix={<FormOutlined />}
                            defaultValue={this.props.name}
                            onChange={this.handleInput.bind(this)}
                        />
                    </p>
                </Modal>
            </span>
        )
    }
}

class DeleteImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    async deleteImage() {
        this.setState({
            loading: true,
        })
        await axios.post('/api',
            {
                api: 'image_delete',
                id: this.props.id,
                server_ip: this.props.server_ip,
            }).then(data => {
                //message.info('删除成功!');
                notification.open({
                    message: '删除成功!',
                    description:
                        '镜像:' + this.props.id + ' 删除成功!',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                });
            });
        this.setState({
            loading: false,
        });
        this.props.onClick();
    }

    render() {
        return (
            <Popconfirm
                placement="right"
                title={'您确定要删除该节点吗？'}
                onConfirm={() => this.deleteImage()}
                okText="是"
                cancelText="否">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<DeleteOutlined />}
                    danger
                    loading={this.state.loading}
                />
            </Popconfirm>
        )
    }
}

export class ImageTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            pagination: {
                pageSize: 8,
                current: 1,
            },
        }
        this.columns = [
            {
                title: '名字',
                dataIndex: 'name',
                width: '33%',
            },
            {
                title: 'ip',
                dataIndex: 'ip',
                width: '33%',
            },
            {
                title: '操作',
                dataIndex: "tags",
                render: (text, record, index) => {
                    return (
                        <span>
                            <AddImageButton onClick={() => this.handleUpdate()} server_ip={record.ip} />
                        </span>
                    )
                }
            }
        ];
    }

    componentDidMount() {
        const { pageSize, current } = this.state.pagination;
        this.fetch({
            page: current,
            results: pageSize,
        })
    }

    handleUpdate() {
        const { pageSize, current } = this.state.pagination;
        this.fetch({
            page: current,
            results: pageSize,
        })
    }

    handleTableChange = (pagination) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
        });
    };

    fetch = (params = {}) => {
        this.setState({ loading: true });
        axios.post('/api',
            {
                api: 'server_info',
                page_current: params.page,
                need: params.results,
            }).then(data => {
                const pagination = { ...this.state.pagination };
                // Read total count from server
                // pagination.total = data.totalCount;
                pagination.total = data.data.total;
                this.setState({
                    loading: false,
                    data: data.data.data,
                    pagination,
                });
            });
    };

    render() {
        return (
            <Table
                columns={this.columns}
                rowKey={record => record.id}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                expandedRowRender={record => { return (<OneImageTable server_ip={record.ip} />) }}
            />
        );
    }
}
