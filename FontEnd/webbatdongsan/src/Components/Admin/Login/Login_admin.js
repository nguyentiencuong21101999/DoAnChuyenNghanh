
import { Col, Row, Form, Button } from "react-bootstrap";
import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios'

import Cookies from 'js-cookie'

import callApi from '../../../Axios/callApi'

const postData = (data) => {
    return axios.post('/login_admin', data)
}
class Login_admin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            username: "",
            password: "",
            msg: ""
        })
    }

    getText = (event) => {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
            [name]: value
        })
    }
    HandleClickLogin = async (e) => {
        e.preventDefault();
        var data = {
            username: this.state.username,
            password: this.state.password
        }
        await callApi('/login_admin', 'post', data)
            .then(

                (res) => {
                    console.log(res);
                    Cookies.set("username", res.data.data.username)
                    Cookies.set("password", res.data.data.password)
                    this.setState({
                        msg: res.data.msg,
                    });

                }
            ).catch((err) => {
                console.log(err);
            })

    }

    render() {

        if (this.state.msg === "Đăng Nhập Thành Công") {
            return <Redirect to="/home-admin" />
        }
        return (
            <div>
                <div className='login'>
                    <div className="login__url">Home-admin/login-admin</div>
                    <div className='login__content'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className='login__form'>
                                    <span className="Login__title">Login</span> <br></br>
                                    <span style={{ color: 'red', marginLeft: '40%' }} className="Login__title">{this.state.msg}</span>
                                    <Form action='/'>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Username</Form.Label>
                                            <Form.Control onChange={(event) => { this.getText(event) }} name="username" type="text" placeholder="Enter Username" />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" onChange={(event) => { this.getText(event) }} name="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Remember Me" />
                                        </Form.Group>
                                        <Button onClick={(e) => { this.HandleClickLogin(e) }} variant="info" type="submit">
                                            Login
                                    </Button>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>

        );
    }
}

export default Login_admin;