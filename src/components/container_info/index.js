import React from 'react';
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import axios from 'axios';
import { Row, Col } from 'antd';



function GetArgs(props){
    let {server_ip, id} = useParams();

    let args = {
        server_ip:server_ip,
        id:id,
    }
    props.transfer_args(args);

    return(
        <div></div>
    );
}

export class ContainerInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:'',
            server_ip:'',
        }
    }

    get_args(props){

        console.log(props);
    }

    render(){
        
        return(
            <div>
                <GetArgs transfer_args={args=>this.get_args(args)} />
                <Row gutter={[8, 8]}>
                    <Col span={6} >
                       {this.state.id}
                    </Col>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    </Row>
                    <Row gutter={[8, 8]}>
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    <Col span={6} />
                    </Row>
            </div>
        );
    }
}