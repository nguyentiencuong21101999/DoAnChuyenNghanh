import { event } from 'jquery';
import React, { Component, useState } from 'react';
import { Carousel, FormCheck, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

import callApi from '../../../Axios/callApi'

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            city: null,

            txtSearch: "",
            redirect: false,

            page: 1,
            //filter
            property: [],
            price: [],
            size: [],
            address: [],
            //sort
            sort: [],
            kind: "Cần Bán"

        })
    }
    componentDidMount() {
        callApi('/home/banner', 'get')
            .then(
                (res) => {
                    if (res.data.length > 0) {
                        console.log(res);
                        this.setState({
                            city: res.data[0].city,
                            // size: res.data[0].size_level,
                            // price: res.data[0].value

                        });
                    }

                }
            )
    }

    getCheckbox = (event) => {
        let checked = event.target.checked;
        let name = event.target.name;
        let value = event.target.value;

        let ban = document.getElementById('lb_ban');
        let chothue = document.getElementById('lb_chothue')

        if (checked) {
            this.setState({
                [name]: value
            });
        }
        if (value === "Cho Thuê") {
            chothue.style.backgroundColor = 'blue'
            chothue.style.color = 'white'
            ban.style.backgroundColor = 'white'
            ban.style.color = '#848484'

        } else {
            chothue.style.backgroundColor = 'white'
            chothue.style.color = '#848484'
            ban.style.backgroundColor = 'blue'
            ban.style.color = ' white'
        }
    }

    getText = (event) => {
        let name = event.target.name;
        let value = [event.target.value];
        console.log(value);

        this.setState({
            [name]: value
        });

    }

    fillter = (e) => {
        e.preventDefault();
        this.setState({
            redirect: true
        });
    }

    render() {
        let redirect = this.state.redirect;
        if (redirect === true) {
            console.log(this.state.txtSearch);
            return (
                <Redirect to={{
                    pathname: '/sell',
                    property: this.state.property,
                    price: this.state.price,
                    size: this.state.size,
                    kind: this.state.kind,
                    sort: [],
                    address: this.state.address,
                    txtSearch: this.state.txtSearch[0],
                    page: this.state.page,
                    data: true
                }}

                />
            )

        }
        let ControlledCarousel = () => {


            return (
                <Carousel interval={3000}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 img_1"
                            src="./img/banner/banner1.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./img/banner/banner2.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./img/banner/banner3.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            );
        }
        let loaibatdongsan = () => {
            return (
                <select onChange={(event) => { this.getText(event) }} className="browser-default custom-select" name="property" id="property">
                    <option>Loại Bất Động Sản</option>
                    <option value="Bất Động Sản Nổi Bật">Bất Động Sản Nổi Bật</option>
                    <option value="Căn Hộ Trung Cư">Căn Hộ Chung Cư</option>
                    <option value="Căn Hộ Mini">Căn Hộ Mini</option>
                    <option value="Căn Hộ Tập Thể">Căn Hộ Tập Thể</option>
                    <option value="Đất Nền">Đất Nền</option>
                </select>
            )
        }
        let thanhpho = () => {
            let city = this.state.city;
            if (city !== null) {
                return city.map((value, key) => {
                    return (
                        <option value={value}>{value}</option>
                    )
                }
                )
            }

        }

        return (
            <div className='header__banner'>
                {ControlledCarousel()}
                <div className='header__search'>
                    <div className="header__sell">
                        <label className="lb-ban" id="lb_ban" for="ban">BÁN</label>
                        <FormCheck onChange={(event) => { this.getCheckbox(event) }} name="kind" id="ban" value="Cần Bán"></FormCheck>

                    </div>
                    <div className="header__lease">
                        <label className="lb-chothue" id="lb_chothue" for="chothue">CHO THUÊ</label>
                        <FormCheck onChange={(event) => { this.getCheckbox(event) }} name='kind' id="chothue" value="Cho Thuê"></FormCheck>
                    </div>
                    <hr />

                    <div className="header__input">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control onChange={(event) => { this.getText(event) }} type="text" name="txtSearch" id='txtSearch' placeholder="Nhập từ khóa" />
                        </Form.Group>
                        <div className="header__select">
                            {loaibatdongsan()}
                        </div>

                        <div className="header__selected">
                            <select onChange={(event) => { this.getText(event) }} name="address" id="address" className="browser-default custom-select ">
                                <option value="">Tỉnh/Thành Phố</option>
                                {thanhpho()}
                            </select>
                        </div>
                        <div className="header__selected">
                            <select onChange={(event) => { this.getText(event) }} className="browser-default custom-select " name="size" id="size">
                                <option>Diện Tích</option>
                                <option value={0 + " " + 30}>Dưới 30 m2</option>
                                <option value={30 + " " + 50}>Từ 30 - 50 m2</option>
                                <option value={50 + " " + 100}>Từ 50 - 100 m2</option>
                                <option value={100 + " " + 150}>Từ 100 - 150 m2</option>
                                <option value={150 + " " + 1000}>Trên 150 m2</option>
                            </select>

                        </div>

                        <div className="header__selected">

                            <select onChange={(event) => { this.getText(event) }} name="price" id="price" className="browser-default custom-select ">
                                <option >Mức Giá</option>
                                <option value={-1 + " " + 0}>Thỏa Thuận</option>
                                <option value={1 + " " + 500000000}>Dưới 500 Triệu</option>
                                <option value={500000000 + " " + 1000000000}>Từ 500 - 1 Tỷ</option>
                                <option value={1000000000 + " " + 3000000000} >Từ 1 - 3 Tỷ</option>
                                <option value={3000000000 + " " + 5000000000}>Từ 3 - 5 Tỷ</option>
                                <option value={5000000000 + " " + 999000000000}>Trên 5 Tỷ</option>
                            </select>
                        </div>

                        <div className="btn-kq">
                            <input onClick={(e) => { this.fillter(e) }} type="button" className="btn btn-primary " value="Xem Kết Quả" />
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}

export default Banner;