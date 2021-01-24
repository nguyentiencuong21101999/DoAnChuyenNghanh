import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

import callApi from '../../../Axios/callApi'
import AccountManager from '../AccountManager/AccountManager'
import Sockets from '../Help_client/socket'


class Home_admin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            url: null,
            dataAccount: null,
            dataNews: null,
            active: false, // chuyen trang
            account: true,
            trueNews: false,
            falseNews: false,
            loadData: null

        })
    }
    componentDidMount() {
        callApi('/accountManager', 'get')
            .then((res) => {
                console.log(res.data);
                this.setState({
                    dataAccount: res.data
                });
            })
        callApi('/newsManager', 'get')
            .then((res) => {
                console.log(res.data);
                this.setState({
                    dataNews: res.data
                });
            })
    }

    logOut = (e) => {
        e.preventDefault();
        Cookies.remove("username");
        Cookies.remove("password");
        this.setState({
            active: true
        });

    }


    // news
    deleteNews = (e, _id) => {
        var getId = {
            id: _id
        }
        e.preventDefault();
        callApi('newsManager/delete', 'post', getId)
            .then(
                this.setState({
                    loadData: 'change'
                })
            )
    }
    //duyet tin
    activeClick = (e, _id) => {
        var getId = {
            id: _id
        }
        e.preventDefault();
        callApi('newsManager/active', 'post', getId)
            .then(
                this.setState({
                    loadData: 'change'
                })
            )

    }

    //end
    // chuyen fucntion
    accountClick = (e) => {
        e.preventDefault();
        this.setState({
            trueNews: false,
            account: true,
            falseNews: false,
            loadData: 'change'

        });
        const account = document.getElementById('account');
        const trueNews = document.getElementById('trueNews');
        const falseNews = document.getElementById('falseNews');
        const manager = document.getElementById('manager')
        account.style.color = "red"
        trueNews.style.color = "black"
        falseNews.style.color = "black"
        manager.style.color = "black"

    }
    trueNewsClick = (e) => {
        e.preventDefault();
        this.setState({
            trueNews: true,
            account: false,
            falseNews: false,
            loadData: 'change'
        });
        const account = document.getElementById('account');
        const trueNews = document.getElementById('trueNews');
        const falseNews = document.getElementById('falseNews');
        const manager = document.getElementById('manager')
        account.style.color = "black"
        trueNews.style.color = "blue"
        falseNews.style.color = "black"
        manager.style.color = "red"
    }
    falseNewsClick = (e) => {
        e.preventDefault();
        this.setState({
            trueNews: false,
            account: false,
            falseNews: true,
            loadData: 'change'
        });
        const account = document.getElementById('account');
        const trueNews = document.getElementById('trueNews');
        const falseNews = document.getElementById('falseNews');
        const manager = document.getElementById('manager')
        account.style.color = "black"
        trueNews.style.color = "black"
        falseNews.style.color = "blue"
        manager.style.color = "red"

    }


    render() {
        //check Login
        if (Cookies.get('username') !== "admin" || Cookies.get('password') !== "admin") {
            return <Redirect to='/login-admin' />
        }
        //Logout
        if (this.state.active === true) {
            return <Redirect to='/login-admin' />
        }
        //load lai data
        if (this.state.loadData !== null) {
            callApi('/newsManager', 'get')
                .then((res) => {
                    console.log(res.data);
                    this.setState({
                        dataNews: res.data,
                        loadData: null
                    });
                })

        }
        //account manager
        const accountManager = () => {
            if (this.state.account === true) {
                return <AccountManager />
            }
        }

        //new manager
        const newsManagerFalse = () => {
            var dataNews = this.state.dataNews;
            if (dataNews !== null) {
                console.log("dataNews:", dataNews);
                if (this.state.falseNews === true) {
                    console.log("this.state.falseNews:", this.state.falseNews);
                    return dataNews.map((value, key) => {
                        if (value.active === false) {
                            return (
                                <tr style={{ textAlign: "center" }}>
                                    <td></td>
                                    <td>{value.kind}</td>
                                    <td>{value.title}</td>
                                    <td>{value.name_user}</td>
                                    <td>{value.phone}</td>
                                    <td> Chưa Duyệt</td>
                                    <td>
                                        <i style={{ color: "green" }} onClick={(e) => { this.activeClick(e, value._id) }} class="fas fa-check-circle"></i>
                                        &ensp;
                                        <i style={{ color: "red" }} onClick={(e) => { this.deleteNews(e, value._id); }} class="fas fa-trash"></i>
                                    </td>
                                </tr>
                            )
                        }
                        return null;
                    })
                }
            }
        }
        const newsManagerTrue = () => {
            var dataNews = this.state.dataNews;
            if (dataNews !== null) {
                if (this.state.trueNews === true) {
                    return dataNews.map((value, key) => {
                        if (value.active === true) {
                            return (
                                <tr style={{ textAlign: "center" }}>
                                    <td>{key + 1}</td>
                                    <td>{value.kind}</td>
                                    <td>{value.title}</td>
                                    <td>{value.name_user}</td>
                                    <td>{value.phone}</td>
                                    <td>Đã Duyệt</td>
                                    <td>
                                        <i style={{ textAlign: "center" }} onClick={(e) => { this.deleteNews(e, value._id); }} class="fas fa-trash"></i>
                                    </td>
                                </tr>
                            )
                        }
                        return null;
                    })
                }
            }
        }

        const newsManagerTop = () => {
            if (this.state.account === false) {
                return (
                    <Table striped bordered hover>
                        <thead>
                            <tr style={{ textAlign: "center" }}>
                                <th scope="col">#</th>
                                <th>Loại</th>
                                <th>Tin</th>
                                <th>Người Đăng</th>
                                <th>SDT</th>
                                <th>Trạng Thái</th>
                                <th>Lựa Chọn</th>
                            </tr>
                        </thead>
                        <tbody >
                            {newsManagerFalse()}
                            {newsManagerTrue()}
                        </tbody>
                    </Table>
                )
            }
        }
        return (
            <div >
                <Sockets />
                <div className="home-admin">
                    <div className='home-admin__header'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 >
                        <br></br>
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4}>
                                <marquee> WELLCOM TO ADMIN</marquee>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4}>

                                <div className='name'>
                                    {Cookies.get('username')}
                                    {/* <p  className='logout'>Đăng Xuất</p> */}
                                </div>
                                <div className="btn_Logout" onClick={(e) => { this.logOut(e) }}>
                                    <i class="fas fa-sign-out-alt iconLogout"></i>
                                </div>
                            </Col>
                        </Row>
                        <div className='home-admin__manager'>
                            <Row>
                                <Col xs={3} sm={3} md={3} lg={3}>
                                    <div onClick={(e) => { this.accountClick(e) }} id='account' className='manager__account'>
                                        <i class="fas fa-user-circle iconManager"></i> Quản lí Tài Khoản
                                    </div>
                                    <div className='manager__news'>
                                        <p id="manager" > <i class="far fa-newspaper iconManager"></i> Quản Lí Tin</p>
                                        <div className="dropdownManager">
                                            <div onClick={(e) => { this.falseNewsClick(e) }} id="falseNews" className='manager__news__false'>
                                                Tin Chưa Duyệt
                                            </div>
                                            <div onClick={(e) => { this.trueNewsClick(e) }} id="trueNews" className='manager__news__true'>
                                                Tin Đã Duyệt
                                        </div>
                                        </div>
                                    </div>

                                </Col>
                                <Col xs={9} sm={9} md={9} lg={9} style={{ marginLeft: "-50px", marginBottom: "2%" }}>
                                    {accountManager()}
                                    {newsManagerTop()}
                                </Col>

                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home_admin;