import React, { Component } from 'react';
/** react-router */
import { NavLink, Redirect } from 'react-router-dom';
/** login modal */
import Cookies from 'js-cookie'
import { Row, Col } from 'react-bootstrap'
import callApi from '../../../Axios/callApi'
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            data: null,
            cookiesUsername: "null",
        })
    }

    componentDidMount() {
        console.log(this.props);
        // console.log(string.split(/[\s,]+/))
        if (Cookies.get("id")) {
            const id = {
                id: Cookies.get("id")
            }
            callApi('http://localhost:3000/postNews/getAccount', 'post', id).then(
                (res) => {
                    this.setState({
                        data: res.data
                    });
                }

            )
        }



    }


    removeCookies = (e) => {
        e.preventDefault();
        Cookies.remove("username");
        Cookies.remove("id");
        Cookies.remove("fullname");
        localStorage.removeItem("img")
        if (!Cookies.get("username")) {
            this.setState({
                cookiesUsername: Cookies.get("username")
            });

        }

    }

    username = () => {
        if (Cookies.get("username")) {
            const strUsername = Cookies.get("fullname").trim().split((/[\s,]+/));
            // console.log(strUsername);
            const username = strUsername[strUsername.length - 1]
            return (
                <div className="drop-down">
                    <div className="name">
                        <div className='info'>
                            {this.avatarHeader()}
                            <span className='name'>
                                {username}
                            </span>
                        </div>
                        <div className="drop_down">
                            <NavLink className="hover" to='/myAccount'>
                                Quản Lí Tài Khoản
                            </NavLink>
                            <br />
                            <NavLink className="hover" to='/myNews'>
                                Quản Lí Đăng Tin
                            </NavLink>
                            <hr></hr>
                            <NavLink style={{ marginTop: "-5px" }} to="/#">
                                <p onClick={(e) => { this.removeCookies(e) }}>Đăng Xuất</p>
                            </NavLink>
                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <NavLink to="/login">
                    Đăng Nhập
                </NavLink>

            )
        }
    }
    avatarHeader = () => {
        const data = this.state.data
        // console.log(data);
        let img = localStorage.getItem("img");
        // console.log(img);

        if (data !== null) {
            if (img) {
                // console.log("co ");
                return (
                    <div className='image'>
                        <img src={img} />
                    </div>
                )
            } else {
                return (
                    <div className='image'>
                        <img src={data.img} />
                    </div>
                )
            }

        }

    }

    header = () => {
        return (
            <div>
                <header id="header" className="header">
                    <div className="header__top">
                        <span className='header__phone'>
                            <NavLink to="/socket"> Tel : +84373631432 </NavLink>
                        </span>
                    </div>
                    <hr />
                    <div className='header__menu'>
                        <ul className='header__menu__content'>
                            <Row>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <Row>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink activeClassName="active" a exact to="/">
                                                    <i class="fas fa-home"></i> HOME
                                                </NavLink>
                                            </div>
                                        </Col>
                                        &ensp;    &ensp;
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink exact to="/Sell"> CẦN BÁN</NavLink>
                                                <ul className="drop-down">
                                                    <li> <NavLink to="/sell/apartment"> Căn hộ Chung cư</NavLink></li> <br />
                                                    <li> <NavLink to="/sell/apartment-mini">Căn hộ mini</NavLink></li> <br />
                                                    <li> <NavLink to="/sell/apartment-group">Căn hộ tập thể </NavLink></li> <br />
                                                    <li> <NavLink to="/sell/soil">Đất Nền </NavLink></li> <br />
                                                </ul>
                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink exact to="/Lease">CHO THUÊ</NavLink>
                                                <ul className="drop_down">
                                                    <li> <NavLink to="/lease/apartment"> Căn hộ trung cư</NavLink></li> <br />
                                                    <li> <NavLink to="/lease/apartment-mini">Căn hộ mini</NavLink></li> <br />
                                                    <li> <NavLink to="/lease/apartment-group">Căn hộ tập thể </NavLink></li> <br />
                                                    <li> <NavLink to="/lease/soil">Đất Nền </NavLink></li> <br />
                                                </ul>

                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink to="/furniture">NỘI THẤT</NavLink>
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3}>
                                            <div className='menu_text'>
                                                <NavLink to="/Blog">TIN TỨC</NavLink>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col className='right' xs={7} sm={7} md={7} lg={7}>
                                    {/* {this.avatarHeader()} */}
                                    <li className="login">
                                        {this.username()}
                                    </li>
                                    <li className='register' >
                                        <NavLink to="/register">
                                            Đăng Ký
                                            </NavLink>
                                    </li>
                                    <li className='post_news' >
                                        <NavLink to="/postnews">
                                            Đăng Tin <i class="fas fa-pencil-alt"></i>
                                        </NavLink>
                                    </li>

                                </Col>
                            </Row>
                        </ul>
                    </div>
                    {/*===================== banner ============= */}

                </header>
            </div>

        )
    }
    render() {
        if (!this.state.cookiesUsername) {
            return (
                <div>
                    {this.header()}
                    <Redirect to="/" />
                </div>
            )
        }
        return (
            <div>
                <header id="header" className="header" d>
                    <div className="header__top">
                        <span className='header__phone'>
                            <a href="/#"> Tel : +84373631432 </a>
                        </span>

                    </div>
                    <hr />
                    <div className='header__menu'>
                        <ul className='header__menu__content'>
                            <Row>
                                <Col xs={5} sm={5} md={5} lg={5}>
                                    <Row>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink activeClassName="active" a exact to="/">
                                                    <i class="fas fa-home"></i> HOME
                                                </NavLink>
                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink exact to="/Sell"> CẦN BÁN</NavLink>
                                                <ul className="drop-down">
                                                    <li> <NavLink to="/sell/apartment"> Căn hộ chung cư</NavLink></li> <br />
                                                    <li> <NavLink to="/sell/apartment-mini">Căn hộ mini</NavLink></li> <br />
                                                    <li> <NavLink to="/sell/apartment-group">Căn hộ tập thể </NavLink></li> <br />
                                                    <li> <NavLink to="/sell/soil">Đất Nền </NavLink></li> <br />
                                                </ul>

                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink exact to="/Lease">CHO THUÊ</NavLink>
                                                <ul className="drop_down">
                                                    <li> <NavLink to="/lease/apartment"> Căn hộ trung cư</NavLink></li> <br />
                                                    <li> <NavLink to="/lease/apartment-mini">Căn hộ mini</NavLink></li> <br />
                                                    <li> <NavLink to="/lease/apartment-group">Căn hộ tập thể </NavLink></li> <br />
                                                    <li> <NavLink to="/lease/soil">Đất Nền </NavLink></li> <br />
                                                </ul>

                                            </div>
                                        </Col>
                                        <Col xs={2} sm={2} md={2} lg={2}>
                                            <div className='menu_text'>
                                                <NavLink to="/furniture">NỘI THẤT</NavLink>
                                            </div>
                                        </Col>
                                        <Col xs={3} sm={3} md={3} lg={3}>
                                            <div className='menu_text'>
                                                <NavLink to="/Blog">TIN TỨC</NavLink>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>

                                <Col className='right' xs={7} sm={7} md={7} lg={7}>
                                    {/* {this.avatarHeader()} */}
                                    <li className="login">
                                        {this.username()}
                                    </li>
                                    <li className='register' >
                                        <NavLink to="/register">
                                            Đăng Ký
                                            </NavLink>
                                    </li>
                                    <li className='post_news' >
                                        <NavLink to="/postnews">
                                            Đăng Tin <i class="fas fa-pencil-alt"></i>
                                        </NavLink>
                                    </li>
                                </Col>

                            </Row>
                        </ul>
                    </div>

                    {/*===================== banner ============= */}

                </header>
                {/* <i className="fas fa-bars iconBar"  ></i> */}

            </div >

        )
    }

    // }
}
export default Header;
