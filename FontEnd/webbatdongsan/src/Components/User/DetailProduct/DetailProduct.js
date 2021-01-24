
import React, { Component } from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';
import Header from '../Header/Header'
import callApi from '../../../Axios/callApi'
import SLIDE_IMAGE from '../Slide_img/Slide_img'
import Sockets from '../../SocKet/socket';

class DetailProduct extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            id_post: null,

            data: null,
            dataAccount: null
        })
    }

    componentDidMount() {
        var idProduct = {
            id: this.props.match.params.id
        }
        callApi('/detailProduct', 'post', idProduct)
            .then(
                (res) => {
                    console.log(res.data);
                    const arrData = []
                    const data = res.data;
                    arrData.push(data);
                    this.setState({
                        data: arrData,
                        id_post: res.data.id_post
                    });
                    const id = {
                        id: res.data.id_post
                    }
                    callApi('/postNews/getAccount', 'post', id).then((res) => {
                        console.log(res.data);
                        const arr_Data = [];
                        const data = res.data
                        arr_Data.push(data)
                        this.setState({
                            dataAccount: arr_Data
                        });
                    })
                    if (res.data.name === "Đất Nền" || res.data.title === "Đất Nền") {
                        const rooms = document.getElementById('rooms');
                        rooms.style.display = "none";
                    }
                }
            )

    }
    image = () => {
        const data = this.state.data;
        return data.map((value, key) => {
            return value.image.map((value, key) => {
                return (
                    <Carousel.Item interval={1000}>
                        <img
                            className="d-block w-100"
                            src={value.linkImage}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                )
            })

        })

    }
    info = () => {
        const dataAccount = this.state.dataAccount;
        if (dataAccount !== null) {
            return dataAccount.map((value, key) => {
                return (

                    <div className='img'>
                        <img src={value.img} />
                    </div>

                )
            })
        }
    }
    detailProduct = () => {
        const data = this.state.data;
        if (data !== null) {
            return data.map((value, key) => {
                let prices = 0;
                if (value.unit === "Triệu") {
                    prices = value.price / 1000000;
                } else {
                    prices = value.price / 1000000000;
                }
                return (

                    <div className="detailProduct">
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={6} className="col">
                                <div className='slideImage'>
                                    <Carousel>
                                        {this.image()}
                                    </Carousel>
                                </div>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6}>
                                <div className='info'>
                                    <Row>
                                        {this.info()}
                                        <div className="info_person">
                                            <div className='name_user'>  {value.name_user}</div>
                                            <div className='phone'><i class="fas fa-mobile-alt"></i>&ensp;0{value.phone}</div>
                                        </div>
                                    </Row>
                                </div>
                                <hr></hr>
                                <div className='content'>
                                    <div className='title'>{value.decription}</div>
                                    <div className='content_news'>
                                        {value.content}
                                    </div>
                                    <div className="next_content">
                                        <div className='prices'>
                                            <span className="price">
                                                <span className='text_price'> Giá : </span>
                                                <span className="numberPrice">
                                                    {prices}
                                                </span>
                                            </span>
                                            <span className='unit'>
                                                {value.unit}
                                            </span>
                                            <span className="size">
                                                <span className="text_size">Diện Tích : </span>
                                                <span className="numberSize">
                                                    {value.size}m2
                                                </span>
                                            </span>
                                        </div>

                                        <span className="rooms" id='rooms'>
                                            <span className="bath">
                                                <span className="text_bath"> Phòng Tắm : </span>
                                                <span className='numberBath'>{value.numberbath}</span>

                                            </span>
                                            <span className="bad" >
                                                <span className="text_bad">
                                                    Phòng Ngủ : </span>
                                                <span classNam='bunberBad'>
                                                    {value.numberbed}
                                                </span>
                                            </span>
                                        </span>
                                        <div className="address">
                                            <span className="text_address">Địa Chỉ : </span>
                                            <span className='numberAddress'>
                                                {value.adress}
                                            </span>


                                        </div>

                                    </div>
                                </div>
                            </Col>
                        </Row >
                        <div className="detailProduct__content"></div>

                    </div >
                )
            })
        }
    }
    render() {
        return (
            <div>
                <Sockets/>
                <Header />
                {this.detailProduct()}
            </div>
        )

    }
}
export default DetailProduct;
