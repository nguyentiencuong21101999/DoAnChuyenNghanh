import React, { Component } from 'react';

import { Table } from 'react-bootstrap'
import { NavLink, Redirect } from 'react-router-dom'

import Header from '../Header/Header'

import axios from 'axios'
import Cookies from 'js-cookie'

import callApi from '../../../Axios/callApi'
const getData = () => {
    return axios.get('myNews')
}
const postData = (id) => {
    return axios.post('/myNews/delete', id)
}
class Mynews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            id_delete: '',
            loadData: null
        }
    }
    componentDidMount() {
        if (this.state.data === null) {
            callApi('myNews', 'get')
                .then((res) => {
                    this.setState({
                        data: res.data
                    });
                })
        }

    }
    deleteNews = (e, id) => {
        e.preventDefault();
        var _id = {
            id: id
        }
        callApi('/myNews/delete', 'post', _id)
            .then(console.log('thanh cong'))
        this.setState({
            loadData: 'change'
        });
    }

    myNews = () => {
        if (this.state.data !== null) {
            console.log("this.state.data:", this.state.data);
            this.state.data.map((value, key) => {
                if (value.id_post === Cookies.get("id")) {
                    if (value.active === true) {
                        return (
                            <tr>
                                <td></td>
                                <td>{value.kind}</td>
                                <td>{value.title}</td>
                                <td>{value.name_user}</td>
                                <td>{value.phone}</td>
                                <td> Đã Duyệt</td>
                                <td>
                                    <NavLink to={'/myNews/edit/' + value._id}>
                                        <i class="far fa-edit"></i>
                                    </NavLink>
                                    &ensp;
                                        <i onClick={(e) => { this.deleteNews(e, value._id); }} class="fas fa-trash"></i>
                                </td>
                            </tr>
                        )
                    } else {
                        return (
                            <tr>
                                <td></td>
                                <td>{value.kind}</td>
                                <td>{value.title}</td>
                                <td>{value.name_user}</td>
                                <td>{value.phone}</td>
                                <td> Chưa Duyệt</td>
                                <td>
                                    <NavLink to={'/myNews/edit/' + value._id}>
                                        <i class="far fa-edit"></i>
                                    </NavLink>
                                    &ensp;
                                     <i onClick={(e) => { this.deleteNews(e, value._id); }} class="fas fa-trash"></i>
                                </td>
                            </tr>
                        )
                    }

                }
                else {
                    return (
                        <div className="ViewEmpty">

                        </div>
                    )
                }
            })
        }

    }
    render() {
        if (!Cookies.get('id') && !Cookies.get('username')) {
            return <Redirect to='/login' />
        }
        if (this.state.loadData !== null) {
            getData().then((res) => {
                this.setState({
                    data: res.data,
                    loadData: null
                });
            })
        }
        return (
            <div>
                <Header />
                <div className="myNews">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th>Loại</th>
                                <th>Tin</th>
                                <th>Người Đăng</th>
                                <th>SDT</th>
                                <th>Trạng Thái</th>
                                <th>Lựa Chọn</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.myNews()}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}
export default Mynews;