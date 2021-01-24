import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import callApi from '../../../Axios/callApi'

class SlideNews extends Component {
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
    render() {
        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 1000,
            slidesToShow: this.props.numberSlide,
            slidesToScroll: 1
        };
       
        let Batdongsan = () => {
            var title = this.props.title;
            if (this.state.data !== null) {
                return this.state.data.map((value, key) => {
                    if (value.title === title) {
                        return (
                            <div class='home__product'>
                                {/* {key} = key
                    <h5 className='title'>
                          {value.title}
                        </h5> */}
                                <NavLink to={"/detailProduct/" + value._id}>
                                    <img
                                        className="d-block w-100 img-newbook"
                                        src={"../../../upload/" + value.image}
                                        alt=""
                                    />

                                    < div className='home__info' >
                                        <h5 className='title'>
                                            {value.decription}
                                        </h5>
                                        <div className='price_sum'>
                                            <span className='price'> {value.price} {value.unit}</span>
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
        return (
            <div className='Home'>
                <div className="home__text">
                    <span>Bất Động Sản Nổi Bật</span>
                    <hr />
                </div>
                <div className='home__slide'>
                    <Slider {...settings}>
                        {Batdongsan()}
                    </Slider>
                </div>

            </div>
        );
    }
}

export default SlideNews;



