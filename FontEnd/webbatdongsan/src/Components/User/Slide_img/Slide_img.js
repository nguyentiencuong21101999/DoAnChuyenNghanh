import React, { Component } from 'react';
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class slide_img extends Component {
    Slide_img = () => {
        return (
            <img
                className="d-block w-100 img-newbook_slide"
                src={this.props.img}
                alt="" 
            />
        )
    }
    render() {
        return (
            <div class='home__product'>
                {this.Slide_img()}
            </div>
        );
    }
}

export default slide_img;