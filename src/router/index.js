import { Modal, Spin } from 'antd';
import axios from 'axios';
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import AboutPage from '../pages/about';
import HomePage from '../pages/home';
import Index from '../pages/index';
import Login from '../pages/login';
import UserPage from '../pages/user';
import WelcomePage from '../pages/welcome';
import './index.css';



export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false,
            isSend: false
        }
    }

    componentDidMount() {
        axios.post('/api',
            {
                api: 'check_login',
            }).then(d => {
                this.setState({
                    isSend: true,
                    isAuthenticated: d.data.isLogin
                })
            }).catch(err => {
                Modal.error({
                    title: '错误：与控制服务器连接失败！',
                    content: '可能控制服务器现在处于维护状态，请稍后再尝试连接。',
                    onOk() {
                        window.location.replace("/")
                    },
                });
            });
    }

    authenticate() {
        this.setState({
            isAuthenticated: true,
            isSend: true
        })
        window.location.replace('/')
    }

    render() {
        const { isAuthenticated, isSend } = this.state
        return (
            <Router>
                <PrivateRoute path='/control' isAuthenticated={isAuthenticated} isSend={isSend} >
                    <Index />
                </PrivateRoute>
                <PrivateRoute path='/user' isAuthenticated={isAuthenticated} isSend={isSend} >
                    <UserPage />
                </PrivateRoute>
                <PrivateRoute exact path='/' isAuthenticated={isAuthenticated} isSend={isSend} >
                    <HomePage />
                </PrivateRoute>
                <PrivateRoute exact path='/about' isAuthenticated={isAuthenticated} isSend={isSend} >
                    <AboutPage />
                </PrivateRoute>
                <Route path='/login' >
                    <Login Login={() => this.authenticate()} />
                </Route>
                <Route path='/welcome' >
                    <WelcomePage />
                </Route>
            </Router>
        );
    }
}


function PrivateRoute({ children, ...rest }) {
    let screen_high = document.body.clientHeight;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                rest.isSend ? (
                    rest.isAuthenticated ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: { from: location }
                                }}
                            />
                        )
                ) : (
                        <div align="center" style={{ "marginTop": `${screen_high / 2 - 25}px` }}>
                            <Spin size="large" tip="与服务器通讯中，请稍后" />
                        </div>

                    )
            }
        />
    );
}
