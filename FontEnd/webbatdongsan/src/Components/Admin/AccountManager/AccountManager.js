import React, { Component } from 'react';
import axios from 'axios';
import { Row, Col, Table } from 'react-bootstrap';

import callApi from '../../../Axios/callApi'

class AccountManager extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            dataAccount: null,
            active: false,
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
    }
    deleteClick = (e, _id) => {
        var getid = {
            id: _id
        }
        e.preventDefault();
        callApi('/accountManager/deleteAccount', 'post', getid)
            .then(
                this.setState({
                    loadData: "change"
                })
            )
    }

    render() {
        if (this.state.loadData !== null) {
            callApi('/accountManager', 'get')
                .then((res) => {
                    this.setState({
                        dataAccount: res.data,
                        loadData: null
                    });
                })
        }
        const accountManager = () => {
            var dataAccount = this.state.dataAccount;
            if (dataAccount !== null) {
                return dataAccount.map((value, key) => {
                    return (
                        <tr style={{ textAlign: "center" }}>
                            <td>{key + 1}</td>
                            <td>{value.fullname}</td>
                            <td>{value.username}</td>
                            <td>{value.password}</td>
                            <td>
                                <p onClick={(e) => { this.deleteClick(e, value._id) }}><i style={{ color: "#c0392b", cursor: 'pointer' }} class="fas fa-trash"></i></p>
                            </td>
                        </tr>
                    )
                })
            }
        }

        return (
            <div className='home-admin__account'>
                <Row>

                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Table striped bordered hover>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th scope="col"></th>
                                    <th> Name</th>
                                    <th>username</th>
                                    <th>password</th>
                                    <th>Lựa Chọn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accountManager()}
                            </tbody>
                        </Table>
                    </Col>

                </Row>

            </div>
        );
    }
}

export default AccountManager;