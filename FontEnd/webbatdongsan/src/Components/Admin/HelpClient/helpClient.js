import React, { Component } from 'react';
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import { Row, Col } from 'react-bootstrap';
const socket = io('/');
class helpClient extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            rooms: [],
            data: null,
            txt_mess: "",
            user_online: null,
            user_selected: "",
            show_chat: false

        })
    }
    componentDidMount() {
        const user = {
            username: Cookies.get("username"),
            to_client: Cookies.get("username"),
            message: {
                rooms: Cookies.get("username"),
                username: Cookies.get("username"),
                txt_mess: this.state.txt_mess
            }
        }
        socket.emit('tao-room', user)
        socket.on('user_online', (data) => {
            this.setState({
                user_online: data
            });
        })
        socket.emit("client", user)
        socket.on('sever', (data) => {
            console.log(data);
            this.setState({ data: data });
        })
    }

    getText = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,

        });
    }
    send = async (e) => {
        e.preventDefault();
        this.setState({
            txt_mess: ""
        });
        const user = {
            username: Cookies.get("username"),
            to_client: this.state.user_selected,
            message: {
                rooms: this.state.user_selected,
                username: Cookies.get("username"),
                txt_mess: this.state.txt_mess
            }

        }
        await socket.emit("client", user)
        socket.on('sever', (data) => {
            console.log(data);
            this.setState({ data: data });
        })

    }
    getUser = async (event) => {
        const { name, value } = event.target
        await this.setState({
            [name]: value,
            show_chat: true


        });
        const user = {
            username: value,
            to_client: value,
            message: {
                rooms: value,
                username: Cookies.get("username"),
                txt_mess: this.state.txt_mess
            }
        }
        socket.emit('tao-room', user)
        socket.emit("client", user)
        socket.on('sever', (data) => {
            this.setState({ data: data });
        })
    }

    render() {
        const user_online = () => {
            const user_online = this.state.user_online;
            if (user_online) {
                return user_online.map(value => {
                    return (
                        <div>
                            <input onClick={(event) => { this.getUser(event) }} type='button' id='usera-selected' name='user_selected' value={value} /> &ensp;
                        </div>
                    )
                })
            }

        }
        const message = () => {
            const data = this.state.data;
            if (data) {
                return this.state.data.map(value => {
                    return (
                        <div>
                            <span>{value.username} : </span>
                            <span>{value.txt_mess}  </span>
                        </div>
                    )
                })
            }
        }
        const user_onlines = () => {
            return (
                <Col xs={4} sm={4} md={4} lg={4}>
                    <div className="user_online">
                        <p>User Online</p>
                        {user_online()}
                    </div>
                </Col>
            )
        }
        const mess = () => {
            const show_mess = this.state.show_chat;
            if (show_mess) {
                return (
                    <Col xs={4} sm={4} md={4} lg={4}>
                        <div className="show-message">
                            {message()}
                        </div>
                        <div className="send-message">
                            <input type='text' name="txt_mess" value={this.state.txt_mess} onChange={(event) => { this.getText(event) }} id='text'></input>
                            <input onClick={(e) => { this.send(e) }} type='submit' value="gửi" />
                        </div>
                        <br></br>
                    </Col>
                )
            }
        }
        return (
            <div className="help-client">
                <Row>
                    {user_onlines()}
                    {mess()}
                </Row>
            </div>
        )
    }
}

export default helpClient;


