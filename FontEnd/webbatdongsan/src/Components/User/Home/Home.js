import React, { Component } from 'react';
import Slider from "react-slick";
import { Col, Row } from "react-bootstrap";


import SlideNews from './SlideNews'
import callApi from '../../../Axios/callApi'
// Import css files

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../../Styles/HomePage.css"
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from '../Header/Header';
import Banner from '../Header/Banner';
import SLIDE_IMG from '../Slide_img/Slide_img';
import Sockets from '../../SocKet/socket';

// luu du lieu vao state de lan sau k can lay nu

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  componentDidMount() {
    if (this.state.data === null) {
      callApi('/home', 'get')
        .then(
          (res) => {
            this.setState({
              data: res.data
            });
          })
    }
  }
  //------------ Bat dong san noi bat ------------------
  Batdongsan = (title) => {
    var title = title
    if (this.state.data !== null) {
      return this.state.data.map((value, index) => {
        let prices = 0;
        if (value.unit === "Triệu") {
          prices = value.price / 1000000;
        } else {
          prices = value.price / 1000000000;
        }
        if (value.title === title) {
          return (
            <div className='home__product' key={index}>
              {/* {key} = key
            <h5 className='title'>
                  {value.title}
                </h5> */}
              <NavLink to={"/detailProduct/" + value._id}>
                <img
                  className="d-block w-100 img-newbook"
                  src={value.image[0].linkImage}
                  alt=""
                />
                < div className='home__info' >
                  <h5 className='title'>
                    {value.decription}
                  </h5>
                  <div className='price_sum'>
                    <span className='price'> {prices} {value.unit}</span>
                    <span className='size'>{value.size}m2</span>
                  </div>
                  <p className='address'>{value.adress}</p>
                </div >
              </NavLink>

            </div>
          )
        }
        return null;
      })
    }
    return null;
  }



  render() {
    var settings = {
      dots: true,
      infinite: true,
      autoplay: false,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1
    };
    var settings2 = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    var settings3 = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (

      // Bất động sản nổi bật
      <div>
        <Sockets />
        <Header />
        <Banner />
        <div className='home'>
          <div className="home__text">
            <span>Bất Động Sản Nổi Bật</span>
            <hr />

          </div>
          <div className='home__slide'>
            <Slider {...settings}>
              {this.Batdongsan("Bất Động Sản Nổi Bật")}
            </Slider>
          </div>
          {/* căn hộ chung cư */}
          <div className="home__text">
            <span>Căn Hộ Chung Cư</span>
            <hr />
          </div>
          <div className='home__slide'>
            <Slider {...settings2}>
              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img1.jpg"
              />

              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img2.jpg"
              />
              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img3.jpg"
              />
            </Slider>
          </div>


          <div className='home__slide'>
            <Slider {...settings}>
              {this.Batdongsan("Căn Hộ Trung Cư")}
            </Slider>
          </div>
          {/* end căn hộ chuung cư */}



          {/* căn hộ mini */}
          <Row >
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="home__text">
                <span>Căn Hộ Mini</span>
                <hr />
              </div>
              <div className='home__slide'>
                <Slider {...settings3}>
                  {this.Batdongsan("Căn Hộ Mini")}
                </Slider>
              </div>
            </Col>
            {/*end căn hộ mini */}

            {/* căn hộ tập thể */}
            <Col xs={6} sm={6} md={6} lg={6}>
              <div className="home__text">
                <span> Căn Hộ Tập Thể</span>
                <hr />
              </div>
              <div className='home__slide'>
                <Slider {...settings3}>
                  {this.Batdongsan("Căn Hộ Tập Thể")}
                </Slider>
              </div>
            </Col>

          </Row>
          {/* end căn hộ tập thể */}
          {/* Đất nền*/}
          <div className="home__text">
            <span>Đất nền</span>
            <hr />
          </div>
          <div className='home__slide'>
            <Slider {...settings2}>
              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img1.jpg"
              />
              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img2.jpg"
              />
              <SLIDE_IMG
                img="./img/Slide/Canhochungcu/img3.jpg"
              />
            </Slider>
          </div>
          <div className='home__slide'>
            <Slider {...settings}>
              {this.Batdongsan("Đất Nền")}
            </Slider>
          </div>
          {/* end căn hộ chuung cư */}
        </div>
      </div>
    );
  }
}

export default Home;
