import React, { Component } from 'react';
import { Col, Row, Form, Button } from "react-bootstrap";
import axios from 'axios'
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header'
import validateLogin from './validate'



class Login extends Component {

    constructor(props) {
        super(props);
        this.state = (
            {
                data: null,
                redirect: null,
                username: "",
                password: "",
                msg: false
            }
        )
    }

    getText = (event) => {
        var name = event.target.name
        console.log(name);
        var value = event.target.value;
        console.log(value);
        this.setState({
            [name]: value,
        });
    }
    HandleClickLogin = (e) => {
        e.preventDefault();
        // validateLogin();
        console.log(validateLogin());
        if (validateLogin() === true) {
            const ui = {
                username: this.state.username,
                password: this.state.password
            }
            axios.post('/login', ui)
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        data: res.data
                    })
                    if (res.data !== "") {
                        Cookies.set("id", res.data._id)
                        Cookies.set("username", res.data.username)
                        Cookies.set("fullname", res.data.fullname)
                    }
                    if (Cookies.get("username") === this.state.username) {
                        this.setState({
                            redirect: "/"
                        });

                    } else {
                        this.setState({
                            msg: true
                        });
                    }

                })
        }


    }

    render() {
        if (Cookies.get("username")) {
            return <Redirect to={this.state.redirect} />
        }
        let msg = () => {
            if (this.state.msg === true) {
                return <span className="msg"> ! Tài Khoản Hoặc Mật Khẩu Không Đúng </span>
            }
        }


        return (
            <div>
                <Header />
                <div className='login'>
                    <div className="login__url">Home/login</div>
                    <div className='login__content'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className='login__form'>
                                    <span className="Login__title">Login</span> <br />
                                    <Form action='/'>
                                        {msg()}
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Username : </Form.Label>
                                            <Form.Control onChange={(event) => { this.getText(event) }} id='username' name="username" type="text" placeholder="Enter Username" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password : </Form.Label>
                                            <Form.Control type="password" onChange={(event) => { this.getText(event) }} id='password' name="password" placeholder="Password" />
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

export default Login;