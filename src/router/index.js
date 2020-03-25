import { Spin } from 'antd';
import axios from 'axios';
import React from "react";
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import HomePage from '../pages/home';
import Index from '../pages/index';
import Login from '../pages/login';
import UserPage from '../pages/user';
import WelcomePage from '../pages/welcome';
import './index.css';







// This example has 3 pages: a public page, a protected
// page, and a login screen. In order to see the protected
// page, you must first login. Pretty standard stuff.
//
// First, visit the public page. Then, visit the protected
// page. You're not yet logged in, so you are redirected
// to the login page. After you login, you are redirected
// back to the protected page.
//
// Notice the URL change each time. If you click the back
// button at this point, would you expect to go back to the
// login page? No! You're already logged in. Try it out,
// and you'll see you go back to the page you visited
// just *before* logging in, the public page.

export default class AuthExample extends React.Component {
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
    console.log(rest.isSend)
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
                        <div align="center" style={{ "marginTop": "20%" }}>
                            <Spin size="large" />
                        </div>

                    )
            }
        />
    );
}
