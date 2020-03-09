import React from 'react';
import 'antd/dist/antd.css';
import './index.css';


import { CommonTable } from '../choose_server_table'



export function ContainerTable(props) {
    return (<CommonTable />);
}



// import { Table, Button, Popconfirm, notification, Modal, Input, Select, Spin, Switch, Divider, message } from 'antd';
// import { DeleteOutlined, SmileOutlined, EyeOutlined, AppstoreAddOutlined, FormOutlined, PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const { Option } = Select;


// class ContainerDeleteButton extends React.Component {

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
//                 api: 'container_delete',
//                 id: this.props.id,
//                 server_ip: this.props.server_ip,
//             }).then(data => {
//                 //message.info('删除成功!');
//                 notification.open({
//                     message: '删除成功!',
//                     description:
//                         '容器:' + this.props.id + '  删除成功!',
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
//                     title={'您确定要删除该容器吗？'}
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

// export function ContainerInfoButton(props) {
//     let { url } = useRouteMatch();
//     return (
//         <Link to={`${url}/${props.server_ip}/${props.id}`} >
//             <Button type="primary" shape="circle" icon={<EyeOutlined />} />
//         </Link>
//     );
// }


// class ContainerAddSearchServer extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: true,
//             data: []
//         }
//     }

//     get_server_list() {
//         this.setState({
//             loading: true,
//             data: [],
//         })
//         axios.post('/api',
//             {
//                 api: 'server_info_all',
//             }).then(data => {
//                 this.setState({
//                     loading: false,
//                     data: data.data.data,
//                 })
//             });
//     }

//     render() {
//         const { data, loading } = this.state;
//         return (
//             <Select
//                 labelInValue
//                 placeholder="请选择节点"
//                 notFoundContent={loading ? <Spin size="small" /> : null}
//                 style={{ width: '100%' }}
//                 loading={loading}
//                 onDropdownVisibleChange={() => this.get_server_list()}
//                 onChange={value => this.props.push_value(value)}
//             >
//                 {data.map(d => (
//                     <Option key={d.ip}>{d.name}</Option>
//                 ))}
//             </Select>
//         )
//     }
// }

// class ContainerAddNetwork extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checked: false,
//             items: [],
//             server_ip: '',
//             need_value: [],
//             value: {},
//             input_value: '',
//         }
//     }

//     handleInput(e) {
//         console.log(e.target.value)
//         const { value } = this.state;
//         this.setState({
//             input_value: e.target.value
//         })
//         this.props.push_value({
//             ip: e.target.value,
//             network: value.label,
//         });
//     }

//     componentDidUpdate(preProps) {
//         if (preProps.server_ip !== this.props.server_ip) {
//             this.setState({
//                 checked: false,
//                 server_ip: this.props.server_ip,
//                 value: {},
//                 input_value: '',
//                 items: [],
//             })
//         }
//     }

//     change_switch() {
//         this.props.push_value({
//             ip: '',
//             network: '',
//         });
//         if (this.state.checked) {
//             this.setState({
//                 checked: false,
//                 value: {},
//                 input_value: '',
//                 items: [],
//             })
//         } else {
//             if (!this.props.server_ip) {
//                 message.error("请先选择服务器节点！")
//             } else {
//                 this.setState({
//                     checked: true,
//                     server_ip: this.props.server_ip,
//                 })
//             }
//         }
//     }

//     get_server_list() {
//         this.setState({
//             items: []
//         });
//         const { server_ip } = this.state
//         console.log(server_ip);
//         axios.post('/api',
//             {
//                 api: 'server_network_info',
//                 server_ip: server_ip,
//             }).then(data => {
//                 this.setState({
//                     items: data.data.data,
//                 })
//             });
//     }

//     handleArgs(value) {
//         this.setState({
//             value: value,
//             input_value: value.value,
//         })
//     }

//     render() {
//         const { items, checked, value, input_value } = this.state;
//         return (
//             <div>
//                 是否使用自定义网络<Switch
//                     checked={checked}
//                     onClick={() => this.change_switch()}
//                 />
//                 <br />
//                 <Select
//                     style={{ width: 240 }}
//                     labelInValue
//                     value={value}
//                     notFoundContent={<Spin size="small" />}
//                     placeholder="查看节点的网络"
//                     disabled={checked ? false : true}
//                     onDropdownVisibleChange={() => this.get_server_list()}
//                     onChange={value => this.handleArgs(value)}
//                     dropdownRender={menu => (
//                         <div>
//                             {menu}
//                         </div>
//                     )}
//                 >
//                     {items.map(d => (
//                         <Option key={d.ip}>{d.name}</Option>
//                     ))}
//                 </Select>
//                 <br />
//                 <Input addonBefore='自定义ip' placeholder="设定详细ip" value={input_value} onChange={this.handleInput.bind(this)} disabled={checked ? false : true} />
//             </div>
//         )
//     }
// }

// class ContainerAddImage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             disabled: true,
//             items: [],
//             value: {},
//             server_ip: '',
//         }
//     }

//     componentDidUpdate(preProps) {
//         if (preProps.server_ip !== this.props.server_ip) {
//             this.setState({
//                 disabled: false,
//                 server_ip: this.props.server_ip,
//                 value: {},
//                 items: [],
//             })
//         }
//     }

//     get_image_list() {
//         this.setState({
//             items: []
//         });
//         const { server_ip } = this.state
//         axios.post('/api',
//             {
//                 api: 'server_image_info',
//                 ip: server_ip,
//             }).then(data => {
//                 this.setState({
//                     items: data.data.data,
//                 })
//             });
//     }

//     handleValue(value) {
//         this.setState({
//             value: value
//         })
//         this.props.push_value(value.value);
//     }


//     render() {
//         const { items, disabled, value, } = this.state;
//         return (
//             <Select
//                 style={{ width: '100%' }}
//                 labelInValue
//                 value={value}
//                 notFoundContent={<Spin size="small" />}
//                 placeholder="查看镜像列表"
//                 disabled={disabled ? true : false}
//                 onDropdownVisibleChange={() => this.get_image_list()}
//                 onChange={value => this.handleValue(value)}
//                 dropdownRender={menu => (
//                     <div>
//                         {menu}
//                     </div>
//                 )}
//             >
//                 {items.map(d => (
//                     <Option key={d.name}>{d.name}</Option>
//                 ))}
//             </Select>
//         )
//     }
// }

// class ContainerAddPorts extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             checked: false,
//             items: ["443:443", "3306:3306", "80.80"],
//             server_port: '',
//             local_port: '',

//             need_value: []
//         }
//     }

//     onServerPortChange = event => {
//         this.setState({
//             server_port: event.target.value,
//         });
//     };

//     onLocalPortChange = event => {
//         this.setState({
//             local_port: event.target.value,
//         });
//     };

//     addItem = () => {
//         const { items, server_port, local_port } = this.state;

//         if (server_port !== '' && local_port !== '') {
//             let name = `${server_port}:${local_port}`
//             this.setState({
//                 items: [...items, name],
//                 server_port: '',
//                 local_port: '',
//                 value: []
//             });
//         }
//     };

//     change_switch() {
//         if (this.state.checked) {
//             this.setState({
//                 checked: false,
//                 value: [],
//             })
//             this.props.push_args([]);
//         } else {
//             this.setState({
//                 checked: true,
//             })
//         }
//     }

//     changeIteams(value) {
//         this.setState({
//             value: value
//         });
//         this.props.push_args(value)
//     }

//     render() {
//         const { items, server_port, local_port, checked, value } = this.state;
//         return (
//             <div>
//                 是否映射端口<Switch
//                     checked={checked}
//                     onClick={() => this.change_switch()}
//                 />
//                 <br />
//                 <Select
//                     mode="multiple"
//                     value={value}
//                     style={{ width: 240 }}
//                     placeholder="请选择端口转发规则"
//                     disabled={checked ? false : true}
//                     onChange={value => this.changeIteams(value)}
//                     dropdownRender={menu => (
//                         <div>
//                             {menu}
//                             <Divider style={{ margin: '4px 0' }} />
//                             <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 4 }}>
//                                 <Input addonBefore="节点端口" style={{ flex: 'auto' }} value={server_port} onChange={this.onServerPortChange} />
//                             </div>
//                             <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 4 }}>
//                                 <Input addonBefore="容器端口" style={{ flex: 'auto' }} value={local_port} onChange={this.onLocalPortChange} />
//                             </div>
//                             <a
//                                 style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
//                                 onClick={this.addItem}
//                             >
//                                 <PlusOutlined /> 添加规则
// </a>
//                         </div>
//                     )}
//                 >
//                     {items.map(item => (
//                         <Option key={item}>{item}</Option>
//                     ))}
//                 </Select>
//             </div>
//         )
//     }
// }

// class ContainerAddButton extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             loading: false,
//             visible: false,
//             input_server: '',
//             input_name: '',
//             input_ip: '',
//             input_ports: [],
//             input_image: '',
//             input_network: '',
//             input_args: '',
//             ifI: true,
//             ifT: true,
//             ifRestart: false,

//             server_key: Math.random(),
//             image_key: Math.random(),
//             network_key: Math.random(),
//             ports_key: Math.random(),
//         };
//     }

//     handleInpulName(e) {
//         this.setState({
//             input_name: e.target.value
//         })
//     }

//     handelInputImage(value) {
//         this.setState({
//             input_image: value
//         })
//         console.log(value);
//     }

//     handelInputArgs(e) {
//         this.setState({
//             input_args: e.target.value
//         })
//     }

//     handelInputNetwork(value) {
//         this.setState({
//             input_network: value.network,
//             input_ip: value.ip
//         })
//         console.log(value);
//     }

//     handelInputServer(value) {
//         this.setState({
//             input_server: value.value,
//         })
//     }

//     handelInputPorts(value) {
//         this.setState({
//             input_ports: value
//         })
//         console.log(value);
//     }

//     handelIfI() {
//         const { ifI } = this.state;
//         if (ifI) {
//             this.setState({
//                 ifI: false,
//             })
//         } else {
//             this.setState({
//                 ifI: true,
//             })
//         }
//     }

//     handelIfT() {
//         const { ifT } = this.state;
//         if (ifT) {
//             this.setState({
//                 ifT: false,
//             })
//         } else {
//             this.setState({
//                 ifT: true,
//             })
//         }
//     }

//     handelIfRestart() {
//         const { ifRestart } = this.state;
//         if (ifRestart) {
//             this.setState({
//                 ifRestart: false,
//             })
//         } else {
//             this.setState({
//                 ifRestart: true,
//             })
//         }
//     }

//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };

//     async handleOk() {
//         this.setState({ loading: true });
//         const {
//             input_server,
//             input_image,
//             input_name,
//             input_network,
//             input_ip,
//             input_ports,
//             input_args,
//             ifI,
//             ifT,
//             ifRestart,
//         } = this.state;

//         if (!input_server || !input_image) {
//             message.error('必要信息没有填写完整!');
//             this.setState({ loading: false });
//             return;
//         }

//         let send_args = {}

//         if (input_name) {
//             send_args = {
//                 name: input_name,
//                 ...send_args
//             }
//         }
//         if (input_ip) {
//             send_args = {
//                 network_config: {
//                     network: input_network,
//                     ip: input_ip,
//                 },
//                 ...send_args
//             }
//         }
//         if (input_ports !== []) {
//             send_args = {
//                 ports: input_ports,
//                 ...send_args
//             }
//         }
//         if (input_args) {
//             send_args = {
//                 args: input_args,
//                 ...send_args
//             }
//         }

//         send_args = {
//             options: {
//                 ift: ifT,
//                 ifi: ifI,
//                 ifr: ifRestart,
//             },
//             ...send_args
//         }

//         console.log(send_args);
//         await axios.post('/api',
//             {
//                 //api: 'container_add',
//                 api: 'test',
//                 info: send_args,
//             }).then(data => {
//                 //message.info('删除成功!');
//                 notification.open({
//                     message: '创建成功!',
//                     description:
//                         '容器:' + data.data.uuid + '  创建成功!',
//                     icon: <SmileOutlined style={{ color: '#108ee9' }} />,
//                 });
//             });

//         this.props.onClick();

//         this.setState({
//             loading: false,
//             visible: false,
//             input_name: '',
//             input_args: '',
//             ifT: true,
//             ifI: true,
//             ifRestart: false,
//             input_server: '',
//             input_image:'',
//             input_network:'',
//             input_ports:'',

//             server_key: Math.random(),
//             image_key: Math.random(),
//             network_key: Math.random(),
//             ports_key: Math.random(),
//         });
//     };

//     handleCancel = () => {
//         this.setState({ visible: false });
//     };

//     render() {
//         const { visible, loading, input_server, ifI, ifT, ifRestart } = this.state;
//         const { server_key, image_key, network_key, ports_key, } = this.state;
//         return (
//             <div>
//                 <Button
//                     type="primary"
//                     shape="round"
//                     icon={<AppstoreAddOutlined />}
//                     onClick={this.showModal}
//                 >创建新容器</Button>
//                 <Modal
//                     visible={visible}
//                     title="容器创建"
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                     footer={[
//                         <Button key="back" onClick={this.handleCancel}>
//                             取消
//                         </Button>,
//                         <Button key="submit" type="primary" loading={loading} onClick={() => this.handleOk()}>
//                             提交
//                         </Button>,
//                     ]}
//                 >
//                     <div>
//                         选择服务器节点
//                         <ContainerAddSearchServer key={server_key} push_value={value => this.handelInputServer(value)} />
//                     </div>
//                     <br />
//                     <div>
//                         选择镜像
//                         <ContainerAddImage key={image_key} push_value={value => this.handelInputImage(value)} server_ip={input_server} />
//                     </div>
//                     <br />
//                     <div>
//                         <ContainerAddNetwork key={network_key} push_value={value => this.handelInputNetwork(value)} server_ip={input_server} />
//                     </div>
//                     <br />
//                     <div>
//                         <Input
//                             addonBefore="名字"
//                             prefix={<FormOutlined />}
//                             placeholder="为容器设置名字(可选)"
//                             onChange={this.handleInpulName.bind(this)}
//                             value={this.state.input_name}
//                         />
//                     </div>
//                     <br />
//                     <div>
//                         <ContainerAddPorts key={ports_key} push_args={value => this.handelInputPorts(value)} />
//                     </div>
//                     <br />
//                     <div>
//                         <Input
//                             addonBefore="启动参数"
//                             prefix={<FormOutlined />}
//                             placeholder="启动参数(可选)"
//                             onChange={this.handelInputArgs.bind(this)}
//                             value={this.state.input_args}
//                         />
//                     </div>
//                     <Divider style={{ margin: '4px 0' }} />
//                     高级选项(无特殊需求请不要更改)
//                     <br />
//                     创建终端:<Switch checked={ifT} onChange={() => this.handelIfT()} />
//                     标准输出:<Switch checked={ifI} onChange={() => this.handelIfI()} />
//                     总是自动启动:<Switch checked={ifRestart} onChange={() => this.handelIfRestart()} />
//                 </Modal>
//             </div>
//         );
//     }
// }

// export class ContainerTable extends React.Component {
//     state = {
//         data: [],
//         pagination: {},
//         loading: false,
//     };

//     columns = [
//         {
//             title: '容器名字',
//             dataIndex: 'name',
//             width: '20%',
//         },
//         {
//             title: '容器ip',
//             dataIndex: 'ip',
//             width: '20%',
//         },
//         {
//             title: '状态',
//             dataIndex: 'status',
//             width: '20%'
//         },
//         {
//             title: '对应集群ip',
//             dataIndex: 'server_ip',
//             width: '20%'
//         },
//         {
//             title: '操作',
//             dataIndex: "tags",
//             render: (text, record, index) => {
//                 return (
//                     <span>
//                         <ContainerDeleteButton
//                             loading={Boolean(false)}
//                             id={record.id}
//                             onClick={() => this.handleRefresh({ id: record.id })}
//                             server_ip={record.server_ip}
//                         />
//                         <ContainerInfoButton
//                             server_ip={record.server_ip}
//                             id={record.id}
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
//                 api: 'container_info',
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
//                 <ContainerAddButton onClick={() => this.handleRefresh()} />
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