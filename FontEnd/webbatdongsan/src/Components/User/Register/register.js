import React, { Component } from 'react';
import { Col, Row, Form, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom'
import Header from '../Header/Header';

import callApi from '../../../Axios/callApi'
import validateRegister from './validateRegister';



class Register extends Component {

    constructor(props) {
        super(props);
        this.state = (
            {
                data: null,
                redirect: false,
                msg: "",
                fullname: "",
                username: "",
                password: ""
            }
        )
    }


    getText = (event) => {
        var name = event.target.name
        var value = event.target.value
        this.setState({
            [name]: value
        });

    }
    HandleClickRegister = (e) => {
        e.preventDefault();
        if (validateRegister() === true) {
            const ui = {
                fullname: this.state.fullname.trim(),
                username: this.state.username.trim(),
                password: this.state.password.trim()
            }
            callApi('/register','post',ui)
            .then(
                (res) => {
                if (res.data === true) {
                    this.setState({
                        redirect: true
                    });
                } else {
                    this.setState({
                        msg: "Tài Khoản Đã Tồn Tại"
                    });
                }
            })
        }

    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to='/login' />
        }
        let msg = this.state.msg;
        return (
            <div>
                <Header />
                <div className='login'>
                    <div className="login__url">Home/Register</div>
                    <div className='login__content'>
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} className="Header__search">
                                <div className="register__form">
                                    <span className="register__title">Register</span>
                                    <Form method="post" >
                                        <span id='msg' className='msg'>{msg}</span>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label> Name</Form.Label>
                                            <i class="fas fa-exclamation-triangle msg_fullname" id='msg_fullname'>
                                                &ensp;<span id='msg_name' className='msg_name'></span>
                                            </i>
                                            <Form.Control onChange={(event) => this.getText(event)} id="fullname" name="fullname" type="text" placeholder="Enter Name" />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicEmail">

                                            <Form.Label> Username</Form.Label>
                                            <i class="fas fa-exclamation-triangle msg_fullname" id='msg_username'>
                                                &ensp;<span id='msg_user' className='msg_name'></span>
                                            </i>
                                            <Form.Control onChange={(event) => this.getText(event)} id="username" name="username" type="text" placeholder="Enter Username" />
                                        </Form.Group>

                                        <Form.Group className="password" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <i class="fas fa-exclamation-triangle msg_password" id='msg_password'>
                                                &ensp;<span id='msg_pass' className='msg_pass'>aaa</span>
                                            </i>

                                            <Form.Control onChange={(event) => this.getText(event)} id='password' name="password" type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Form.Group className="confirm" controlId="formBasicPassword">
                                            <Form.Label>ConfirmPassword</Form.Label>
                                            <Form.Control id="confirmpassword" type="password" placeholder="Password" />
                                        </Form.Group>
                                        <Button onClick={(e) => this.HandleClickRegister(e)} variant="info" type="submit">
                                            Register
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

export default Register;