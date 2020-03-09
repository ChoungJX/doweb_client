import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Card } from 'antd';
import axios from 'axios';

import ServerAddButton from './add_button'
import ServerDeleteButton from './delete_button'

export class ServerTable extends React.Component {
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
                title: '状态',
                dataIndex: 'server_status',
                key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <ServerDeleteButton server_id={record.id} onFresh={() => this.handleRefresh()} />
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
                <Card title="服务器一览" extra={<ServerAddButton onFresh={() => this.handleRefresh()} />} >
                    <Table loading={loading} rowKey={record => record.id} columns={this.columns} dataSource={data} size="middle" />
                </Card>
            </div>
        );
    }
}





// import { Table, Button, Popconfirm, notification, Modal, Input } from 'antd';
// import { DeleteOutlined, SmileOutlined, EditOutlined, AppstoreAddOutlined, FormOutlined, CloudServerOutlined } from '@ant-design/icons';
// import axios from 'axios';




// class ServerDeleteButton extends React.Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             loading: props.loading,
//         }
//     }

//     async deleteServer() {
//         this.setState({
//             loading: true,
//         });

//         await axios.post('/api',
//             {
//                 api: 'server_delete',
//                 id: this.props.id,
//             }).then(data => {
//                 //message.info('删除成功!');
//                 notification.open({
//                     message: '删除成功!',
//                     description:
//                         '节点:' + this.props.id + '  删除成功!',
//                     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
//                 });
//             });

//         this.setState({
//             loading: false,
//         });

//         this.props.onClick();
//     }

//     render() {
//         return (
//             <span>
//                 <Popconfirm
//                     placement="right"
//                     title={'您确定要删除该节点吗？'}
//                     onConfirm={() => this.deleteServer()}
//                     okText="是"
//                     cancelText="否">
//                     <Button
//                         type="primary"
//                         shape="circle"
//                         icon={<DeleteOutlined />}
//                         danger
//                         loading={this.state.loading}
//                     />
//                 </Popconfirm>
//             </span>
//         )
//     }
// }

// class ServerEditButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             visible: false,
//             input_value: '',
//         };
//     }

//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };

//     async handleOk() {
//         this.setState({ loading: true });

//         await axios.post('/api',
//             {
//                 api: 'server_renew',
//                 id: this.props.id,
//                 name: this.state.input_value,
//             }).then(data => {
//                 //message.info('删除成功!');
//                 notification.open({
//                     message: '修改成功!',
//                     description:
//                         '节点:' + this.props.id + '  名字修改成功!',
//                     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
//                 });
//             });

//         this.props.onClick();

//         this.setState({ loading: false, visible: false });
//     };

//     handleCancel = () => {
//         this.setState({ visible: false });
//     };

//     handleInpul(e) {
//         this.setState({
//             input_value: e.target.value
//         })
//     }

//     render() {
//         const { visible, loading } = this.state;
//         return (
//             <span>
//                 <Button
//                     type="primary"
//                     shape="circle"
//                     icon={<EditOutlined />}
//                     onClick={this.showModal}
//                 />
//                 <Modal
//                     visible={visible}
//                     title="节点信息修改"
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     footer={[
//                         <Button key="back" onClick={this.handleCancel}>
//                             返回
//                     </Button>,
//                         <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk()}>
//                             提交
//                     </Button>,
//                     ]}
//                 >
//                     <p>
//                         <Input
//                             size="large"
//                             placeholder="请输入名字..."
//                             prefix={<FormOutlined />}
//                             defaultValue={this.props.name}
//                             onChange={this.handleInpul.bind(this)}
//                         />
//                     </p>
//                 </Modal>
//             </span>
//         )
//     }
// }

// class ServerAddButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             visible: false,
//             input_name: '',
//             input_ip: '',
//         };
//     }

//     handleInpulName(e) {
//         this.setState({
//             input_name: e.target.value
//         })
//     }

//     handleInpulIp(e) {
//         this.setState({
//             input_ip: e.target.value
//         })
//     }

//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };

//     async handleOk() {
//         this.setState({ loading: true });

//         await axios.post('/api',
//             {
//                 api: 'server_add',
//                 ip: this.state.input_ip,
//                 name: this.state.input_name,
//             }).then(data => {
//                 //message.info('删除成功!');
//                 notification.open({
//                     message: '添加成功!',
//                     description:
//                         '节点:' + data.data.uuid + '  添加成功!',
//                     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
//                 });
//             });

//         this.props.onClick();

//         this.setState({ loading: false, visible: false, input_ip: '', input_name: '' });
//     };

//     handleCancel = () => {
//         this.setState({ visible: false });
//     };

//     render() {
//         const { visible, loading } = this.state;
//         return (
//             <div>
//                 <Button
//                     type="primary"
//                     shape="round"
//                     icon={<AppstoreAddOutlined />}
//                     onClick={this.showModal}
//                 >添加新节点</Button>
//                 <Modal
//                     visible={visible}
//                     title="节点添加"
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     footer={[
//                         <Button key="back" onClick={this.handleCancel}>
//                             取消
//             </Button>,
//                         <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk()}>
//                             提交
//             </Button>,
//                     ]}
//                 >
//                     <p>
//                         <Input
//                             size="large"
//                             prefix={<FormOutlined />}
//                             placeholder="请输入节点名字..."
//                             onChange={this.handleInpulName.bind(this)}
//                             value={this.state.input_name}
//                         />
//                     </p>
//                     <p>
//                         <Input
//                             size="large"
//                             prefix={<CloudServerOutlined />}
//                             placeholder="请输入节点ip..."
//                             onChange={this.handleInpulIp.bind(this)}
//                             value={this.state.input_ip}
//                         />
//                     </p>
//                 </Modal>
//             </div>
//         );
//     }
// }

// export class ServerTable extends React.Component {
//     state = {
//         data: [],
//         pagination: {},
//         loading: false,
//     };

//     columns = [
//         {
//             title: '节点名字',
//             dataIndex: 'name',
//             width: '20%',
//         },
//         {
//             title: '节点ip',
//             dataIndex: 'ip',
//             width: '20%',
//         },
//         {
//             title: '状态',
//             dataIndex: 'status',
//             width: '20%'
//         },
//         {
//             title: '操作',
//             dataIndex: "tags",
//             render: (text, record, index) => {
//                 return (
//                     <span>
//                         <ServerDeleteButton
//                             loading={Boolean(false)}
//                             id={record.id}
//                             onClick={() => this.handleRefresh({ id: record.id })}
//                         />
//                         <ServerEditButton
//                             id={record.id}
//                             name={record.name}
//                             onClick={() => this.handleRefresh({ id: record.id })}
//                         />
//                     </span>
//                 )
//             }
//         }
//     ];


//     handleRefresh(props) {

//         const pager = { ...this.state.pagination };

//         this.fetch({
//             page: pager.current,
//             results: 8,
//         });

//     }


//     componentDidMount() {
//         this.fetch({
//             page: 1,
//             results: 8,
//         });
//     }

//     handleTableChange = (pagination, filters, sorter) => {
//         const pager = { ...this.state.pagination };
//         pager.current = pagination.current;
//         this.setState({
//             pagination: pager,
//         });
//         this.fetch({
//             results: pagination.pageSize,
//             page: pagination.current,
//             sortField: sorter.field,
//             sortOrder: sorter.order,
//             ...filters,
//         });
//     };

//     fetch = (params = {}) => {
//         this.setState({ loading: true });

//         axios.post('/api',
//             {
//                 api: 'server_info',
//                 page_current: params.page,
//                 need: params.results,
//             }).then(data => {
//                 const pagination = { ...this.state.pagination };
//                 // Read total count from server
//                 // pagination.total = data.totalCount;
//                 pagination.total = data.data.total;
//                 pagination.current = params.page;
//                 pagination.pageSize = params.results;
//                 this.setState({
//                     loading: false,
//                     data: data.data.data,
//                     pagination: pagination,
//                 });
//             });
//     };

//     render() {
//         return (
//             <div>
//                 <ServerAddButton onClick={() => this.handleRefresh()} />
//                 <Table
//                     columns={this.columns}
//                     rowKey={record => record.id}
//                     dataSource={this.state.data}
//                     pagination={this.state.pagination}
//                     loading={this.state.loading}
//                     onChange={this.handleTableChange}
//                 />
//             </div>
//         );
//     }
// }