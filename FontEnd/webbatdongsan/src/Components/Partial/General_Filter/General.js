import React, { Component } from 'react';
import axios from 'axios'
import { Button, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import Header from '../../User/Header/Header';
import callApi from '../../../Axios/callApi'

class Genaral extends Component {
    constructor(props) {

        super(props);

        this.state = {
            data: null,
            dataFilter: null,
            txtSearch: "",
            totalNews: null,

            page: 1,
            sumPage: null,
            numberPage: null,
            sumNews: null,

            //filter
            property: [],
            price: [],
            size: [],
            address: [],
            //sort
            sort: [],
            kind: this.props.kind

        }
    }
    componentDidMount() {
        let fillter = this.props.location.location;
        console.log(fillter);
        let txtSearch = ""
        if (fillter.txtSearch === undefined) {
            txtSearch = ''
        } else {
            txtSearch = fillter.txtSearch
        }
        if (fillter.data === true) {
            const arr_all = [
                fillter.property,
                fillter.price,
                fillter.size,
                fillter.address,
                ["null"],
                fillter.kind,
                {
                    page: this.state.page,
                },
                txtSearch
            ]
            this.setState({
                property: fillter.property,
                price: fillter.price,
                size: fillter.size,
                address: fillter.address,
                sort: ["null"],
                kind: fillter.kind,
                txtSearch: txtSearch

            });
            callApi('/sell/filter', 'post', arr_all).then(
                (res) => {
                    console.log(res);
                    const sumPage = res.data[1]; //tong trang
                    const sumNews = res.data[2] // tong san pham
                    //latePage = res[1]
                    this.setState({
                        data: res.data[0],
                        sumPage: sumPage,
                        sumNews: sumNews
                    });
                })

        }
        else {
            if (this.state.data === null) {
                console.log(this.props.kind);
                const arr_all = [
                    this.state.property,
                    this.state.price,
                    this.state.size,
                    this.state.address,
                    this.state.sort,
                    this.state.kind,
                    {
                        page: this.state.page,
                    },
                    this.state.txtSearch
                ]
                callApi('/sell/filter', 'post', arr_all).then(
                    (res) => {
                        console.log(res);
                        const sumPage = res.data[1]; //tong trang
                        const sumNews = res.data[2] // tong san pham
                        //latePage = res[1]
                        this.setState({
                            data: res.data[0],
                            sumPage: sumPage,
                            sumNews: sumNews
                        });
                    })
            }
            callApi('/sell/filter', "get").then(
                (res) => {

                    this.setState({
                        dataFilter: res.data
                    });
                }
            )

        }
    }


    //----------------------Sort---------------------------//
    getSort = async (event) => {
        let arr = this.state.sort;
        const value = event.target.value;
        if (arr.length < 1) {
            arr.push(value)
        } else {
            arr.splice(0, 1);
            arr.push(value)
        }
        if (this.state.sort !== "") {
            const arr_all = [
                this.state.property,
                this.state.price,
                this.state.size,
                this.state.address,
                this.state.sort,
                this.state.kind,
                {
                    page: this.state.page
                },
                this.state.txtSearch
            ]
            await callApi('/sell/filter', 'post', arr_all).then(
                (res) => {
                    console.log(res);
                    const sumPage = res.data[1]
                    const sumNews = res.data[2] // tong san pham
                    this.setState({
                        data: res.data[0],
                        sumNews: sumNews,
                        sumPage: sumPage
                    })
                }
            )
        }

    }

    //----------------------Filter-----------------------//
    getFilter = (event) => {
        let arr = this.state.property;
        let value = event.target.value;
        const checked = event.target.checked;
        if (checked) {
            arr.push(value);
        } else {
            const index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            }

        }
        console.log(arr);
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind,
            {
                page: this.state.page
            },
            this.state.txtSearch
        ]
        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                console.log(res);
                const sumPage = res.data[1]
                const sumNews = res.data[2] // tong san pham
                this.setState({
                    data: res.data[0],
                    sumNews: sumNews,
                    sumPage: sumPage
                })
            }
        )

    }
    getPrice = (event) => {
        var arr_price = this.state.price;
        let value = event.target.value;
        console.log(value);
        const checked = event.target.checked;

        if (checked) {
            arr_price.push(value);
        } else {
            const index = arr_price.indexOf(value);
            if (index > -1) {
                arr_price.splice(index, 1);
            }

        }
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind, {
                page: this.state.page
            },
            this.state.txtSearch
        ]

        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                const sumPage = res.data[1]
                const sumNews = res.data[2] // tong san pham
                this.setState({
                    data: res.data[0],
                    sumNews: sumNews,
                    sumPage: sumPage
                })
            }
        )


    }
    getSize = (event) => {
        var arr_size = this.state.size;
        let value = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            arr_size.push(value);
        } else {
            const index = arr_size.indexOf(value);
            if (index > -1) {
                arr_size.splice(index, 1);
            }

        }
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind, {
                page: this.state.page
            },
            this.state.txtSearch
        ]
        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                const sumPage = res.data[1]
                const sumNews = res.data[2] // tong san pham
                this.setState({
                    data: res.data[0],
                    sumNews: sumNews,
                    sumPage: sumPage
                })
            }
        )


    }
    getAddress = (event) => {
        var arr_address = this.state.address;
        let value = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            arr_address.push(value);
        } else {
            const index = arr_address.indexOf(value);
            if (index > -1) {
                arr_address.splice(index, 1);
            }

        }
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind,
            {
                page: this.state.page
            },
            this.state.txtSearch

        ]

        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                const sumPage = res.data[1]
                const sumNews = res.data[2] // tong san pham
                this.setState({
                    data: res.data[0],
                    sumNews: sumNews,
                    sumPage: sumPage
                })
            }
        )



    }
    //----------------------End FIllter --------------------//
    // lay du lieu o tim kiem
    getSearch = (event) => {
        var value = event.target.value;
        this.setState({
            txtSearch: value
        })

        //neu khong tim gi` thi return ve ban dau
        if (value === "") {
            const arr_all = [
                this.state.property,
                this.state.price,
                this.state.size,
                this.state.address,
                this.state.sort,
                this.state.kind,
                {
                    page: this.state.page
                },
                ""


            ]
            callApi('/sell/filter', 'post', arr_all).then(
                (res) => {
                    const sumPage = res.data[1]
                    const sumNews = res.data[2] // tong san pham
                    this.setState({
                        data: res.data[0],
                        sumNews: sumNews,
                        sumPage: sumPage
                    })
                }
            )
        }
    }
    handleClick = (e) => {
        e.preventDefault();
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind,
            {
                page: this.state.page
            },
            this.state.txtSearch


        ]


        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                const sumPage = res.data[1]
                const sumNews = res.data[2] // tong san pham
                this.setState({
                    data: res.data[0],
                    sumNews: sumNews,
                    sumPage: sumPage
                })
            }
        )
    }
    pre = async () => {
        if (this.state.page > 1) {
            let cr_state = this.state.page - 1;
            await this.setState({
                page: cr_state
            });
            const arr_all = [
                this.state.property,
                this.state.price,
                this.state.size,
                this.state.address,
                this.state.sort,
                this.state.kind,
                {
                    page: this.state.page,
                },
                this.state.txtSearch
            ]
            callApi('/sell/filter', 'post', arr_all).then(
                (res) => {
                    console.log(res);
                    const sumPage = res.data[1]
                    this.setState({
                        data: res.data[0],
                        sumPage: sumPage  //attension
                    })
                }
            )
        }
    }
    next = async () => {
        if (this.state.page < this.state.sumPage) {
            let cr_state = this.state.page + 1;
            await this.setState({
                page: cr_state
            });
            // lam xong await roi ms lam` tiep
            const arr_all = [
                this.state.property,
                this.state.price,
                this.state.size,
                this.state.address,
                this.state.sort,
                this.state.kind,
                {
                    page: this.state.page,
                },
                this.state.txtSearch
            ]
            callApi('/sell/filter', 'post', arr_all).then(
                (res) => {
                    const sumPage = res.data[1];
                    this.setState({
                        data: res.data[0],
                        sumPage: sumPage //attension
                    })

                }
            )
        }

    }
    // hieen thi so trang 
    numberPage = async (event) => {
        let numberPage = parseInt(event.target.value)
        this.setState({
            page: numberPage
        });
        const arr_all = [
            this.state.property,
            this.state.price,
            this.state.size,
            this.state.address,
            this.state.sort,
            this.state.kind,
            {
                page: numberPage
            },
            this.state.txtSearch
        ]
        callApi('/sell/filter', 'post', arr_all).then(
            (res) => {
                console.log(res.data[1]);
                this.setState({
                    data: res.data[0],
                    totalNews: res.data[1]  //attension
                })
            }
        )
    }
    render() {
        let result = () => {
            const mess = this.state.sumNews;
            if (this.state.data !== null) {
                return (
                    <div className='message'>
                        <Row>
                            <Col xs={4} sm={4} md={4} lg={4}>
                                <span className='text_mes'>BẤT ĐỘNG SẢN TÌM ĐƯỢC :</span>
                                <span className="number_mess"> ({mess})</span>
                            </Col>
                            <Col xs={5} sm={5} md={5} lg={5}>
                            </Col>
                            <select onChange={(event) => { this.getSort(event) }} className='form-control select'>
                                <option value="null">Sắp Xếp</option>
                                <option value={"price" + " " + 1} >Giá Tăng Dần</option>
                                <option value={"price" + " " + -1}>Giá Giảm Dần</option>
                                <option value={"size" + " " + 1}>Diện Tích Tăng Dần</option>
                                <option value={"size" + " " + -1}>Diện Tích Giảm Giần</option>
                            </select>
                        </Row>
                    </div>
                )
            }
        }
        let sell = () => {
            // var kind = "Cho Thuê"
            if (this.state.data !== null) {
                return this.state.data.map((value, key) => {
                    let prices = 0;
                    if (value.unit === "Triệu") {
                        prices = value.price / 1000000;
                    } else {
                        prices = value.price / 1000000000;
                    }
                    return (
                        <Row>
                            <div class='home__product' key={key}>
                                <div className='border'>
                                    <NavLink to={
                                        //  this.props.location.match.url
                                        "/DetailProduct"
                                        + "/" + value._id}>
                                        <Col xs={4} sm={4} md={4} lg={4}>
                                            <img
                                                className="d-block w-100 img-newbook"
                                                src={value.image[0].linkImage}
                                                alt=""
                                            />
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            < div className='home__info' >
                                                <h5 className='title'>
                                                    {value.decription}
                                                </h5>
                                                <div className='info'>
                                                    <span className='name_user'>
                                                        <i class="fas fa-user"></i>  {value.name_user}
                                                    </span>
                                                    <span className='phone'><i class="fas fa-phone-alt"></i>  {value.phone}</span>
                                                </div>
                                                <div className="prices">
                                                    <span className='price'>{prices} {value.unit}</span>
                                                    <span className='size'>{value.size} m2</span>
                                                </div>
                                                <p className='address'> <i class="fas fa-map-marker-alt"></i> {value.adress}</p>
                                            </div >
                                        </Col>
                                    </NavLink>

                                </div>
                            </div>
                        </Row>
                    )
                    // }
                })
            }
        }
        let Pagination = () => {
            let btnPre = () => {
                let page = this.state.page;
                if (page > 1) {
                    return (
                        <input onClick={() => { this.pre() }} id='pre' type='submit' value="«" />
                    )
                }
            }
            let btnNext = () => {
                let page = this.state.page;
                let sumPage = this.state.sumPage;

                if (page < sumPage) {
                    return (
                        <input onClick={() => { this.next() }} id='next' type='submit' value='»' />
                    )
                }

            }
            let page = () => {
                const sumPage = this.state.sumPage;
                if (sumPage !== null) {
                    let arr = [];
                    //console.log(SumPage);
                    for (let i = 1; i <= sumPage; i++) {
                        arr.push(i)
                    }
                    return arr.map((value, key) => {
                        return (
                            <input onClick={(event) => { this.numberPage(event) }} type='submit' id={value} value={value} />
                        )
                    })
                }

            }
            let data = this.state.data
            if (data !== null) {
                if (data.length !== 0) {
                    return (
                        <div className="pagination">
                            {btnPre()}
                            {page()}
                            {btnNext()}
                        </div >
                    )
                } else {
                    return (
                        <div>Không Tìm Thấy Sản Phẩm nào</div>
                    )
                }


            }
        }
        let filter = () => {
            let address = () => {
                const dataFilter = this.state.dataFilter;
                if (dataFilter !== null) {
                    return dataFilter.map((value, index) => {
                        const address = value.city;
                        return address.map((value, index) => {
                            return (
                                <Col xs={6} sm={6} md={6} lg={6} key={index}>
                                    <input onChange={(event) => { this.getAddress(event) }} type='checkbox' name='title' id='size' value={value} /> &ensp;
                                    <label >{value}</label>
                                </Col>
                            )
                        })


                    })

                }
            }
            return (
                <div className='filter'>
                    <div className='filter_title'>
                        <p className="text_title">Loại Bất Động Sản <i class="fas fa-chevron-down"></i> </p>
                        <hr />
                        <div className="checkbox">
                            <div className='checkbox_title'>
                                <input onChange={(event) => { this.getFilter(event) }} type='checkbox' name='property' id='title' value="Bất Động Sản Nổi Bật" /> &ensp;
                                <label for='title'>Bất Động Sản Nổi </label>
                                <br></br>
                                <input onChange={(event) => { this.getFilter(event) }} type='checkbox' name='title' id='title_1' value="Căn Hộ Trung Cư" /> &ensp;
                                <label for='title_1'>Căn Hộ chung cư </label>
                                <br></br>
                                <input onChange={(event) => { this.getFilter(event) }} type='checkbox' name='title' id='title_2' value="Căn Hộ Mini" /> &ensp;
                                <label for='title_2'>Căn Hộ Mini </label>
                                <br></br>
                                <input onChange={(event) => { this.getFilter(event) }} type='checkbox' name='title' id='title_3' value="Căn Hộ Tập Thể" /> &ensp;
                                <label for='title_3'>Căn Hộ Tập Thể</label>
                                <br></br>
                                <input onChange={(event) => { this.getFilter(event) }} type='checkbox' name='title' id='title_4' value="Đất Nền" /> &ensp;
                                <label for='title_4'>Đất Nền</label>
                            </div>
                        </div>
                        <p className="text_title">Giá <i class="fas fa-chevron-down"></i> </p>
                        <hr />
                        {/* //----------------------price----------------------------// */}
                        <div className="checkbox">
                            <div className='checkbox_title'>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price_0' value={-1 + " " + 0} /> &ensp;
                                    <label for='price_0'>Thỏa Thuận</label>
                                <br></br>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price' value={1 + " " + 500000000} /> &ensp;
                                    <label for='price'>Dưới 500 Triệu</label>
                                <br></br>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price_1' value={500000000 + " " + 1000000000} /> &ensp;
                                    <label for='price_1'>Từ 500 - 1 Tỷ</label>
                                <br></br>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price_2' value={1000000000 + " " + 3000000000} /> &ensp;
                                    <label for='price_2'>Từ 1 - 3 Tỷ</label>
                                <br></br>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price_3' value={3000000000 + " " + 5000000000} /> &ensp;
                                    <label for='price_3'> Từ 3 - 5 Tỷ</label>
                                <br></br>
                                <input onChange={(event) => { this.getPrice(event) }} type='checkbox' name='title' id='price_4' value={5000000000 + " " + 999000000000} /> &ensp;
                                    <label for='price_4'>Trên 5 Tỷ</label>
                                <br></br>
                            </div>
                        </div>
                        {/* //----------------------S I Z E----------------------------// */}
                        <p className="text_title">Diện Tích <i class="fas fa-chevron-down"></i> </p>
                        <hr />
                        <div className="checkbox">
                            <div className='checkbox_title'>
                                <input onChange={(event) => { this.getSize(event) }} type='checkbox' name='title' id='size' value={0 + " " + 30} /> &ensp;
                                    <label for='size'>Dưới 30 m2</label>
                                <br></br>
                                <input onChange={(event) => { this.getSize(event) }} type='checkbox' name='title' id='size_1' value={30 + " " + 50} /> &ensp;
                                    <label for='size_1'>Từ 30 - 50 m2</label>
                                <br></br>
                                <input onChange={(event) => { this.getSize(event) }} type='checkbox' name='title' id='size_2' value={50 + " " + 100} /> &ensp;
                                    <label for='size_2'>Từ 50 - 100 m2</label>
                                <br></br>
                                <input onChange={(event) => { this.getSize(event) }} type='checkbox' name='title' id='size_3' value={100 + " " + 150} /> &ensp;
                                    <label for='size_3'>Từ 100 - 150 m2</label>
                                <br></br>
                                <input onChange={(event) => { this.getSize(event) }} type='checkbox' name='title' id='size_4' value={150 + " " + 1000} /> &ensp;
                                    <label for='size_4'>Trên 150 m2</label>
                                <br></br>
                            </div>
                        </div>

                        <p className="text_title">Địa Chỉ <i class="fas fa-chevron-down"></i> </p>
                        <hr />
                        <div className="checkbox">
                            <div className='checkbox_title'>
                                <Row>
                                    {address()}
                                </Row>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        window.scrollTo(100, 100);
        return (
            <div>

                <Header />
                {/* <div className="estate">
                    <SlideNews title="Bất Động Sản Nổi Bật" numberSlide={5} />
                </div> */}
                <div className='full_sell'>
                    <Row>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            {filter()}
                        </Col>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            <div className='sell'>
                                <form>
                                    <Row>
                                        <Col xs={2} sm={2} md={2} lg={2} className="col"></Col>
                                        <Col xs={6} sm={6} md={6} lg={6}>
                                            <   input onChange={(event) => { this.getSearch(event) }} type="text" className="form-control input_search" name="txtSearch" id="search" placeholder="Enter Key" />
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            {/* <input  onClick ={(e) => this.getdata(e)}  type="submit" value="Search"></input> */}
                                            <Button type='submit' onClick={(e) => {
                                                this.handleClick(e)
                                            }}> search</Button>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}></Col>
                                    </Row>
                                </form >
                                <br />
                                {result()}
                                {sell()}
                                <Row>
                                    <Col xs={4} sm={4} md={4} lg={4}></Col>
                                    <Col xs={4} sm={4} md={4} lg={4}>
                                        <div class="container">
                                            {Pagination()}
                                        </div>
                                    </Col>
                                    <Col xs={4} sm={4} md={4} lg={4}></Col>
                                </Row>
                            </div >
                        </Col>
                    </Row>
                </div >
            </div>

        );
    }
}

export default Genaral;