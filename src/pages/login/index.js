import React from 'react';
import 'antd/dist/antd.css';
import { 
    Row,
    Col,
    Calendar,
} from 'antd'
import { LoginForm } from '../../components/login_form'



function onPanelChange(value, mode) {
    console.log(value.format('YYYY-MM-DD'), mode);
}


export default class Login extends React.Component{

    render(){
        return(
            <div>
                <Row>
                <Col span={24}><br></br></Col>
                </Row>
                <Row align={'middle'}>
                <Col span={1} />
                <Col span={12}>
                    <Calendar onPanelChange={onPanelChange} />
                </Col>
                <Col span={9}>
                    <LoginForm />
                </Col>
                <Col span={2} />
                </Row>
          </div>
        )
    }
}
