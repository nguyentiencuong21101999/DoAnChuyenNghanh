import React, { Component } from 'react';

import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../Header/Header';

import { Image } from 'cloudinary-react';
import { Redirect } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

import callApi from '../../../Axios/callApi'
import checkEdit from './checkEdit'
let [size, bad] = [120, 10];
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileImage: [], //chua arr image da chon

            price: 0,
            txtPrice: 0,
            txtBath: null,
            txtBad: null,

            data: null,
            save: false,
            //post ve node
            active: false,
            id_post: null,
            url: '/login',
            oldLinkImage: [], // image cu
            linkImage: [],  // imgae sau khi post len cloud

            postImg: [] // arr chua image de post ve sever
        }
    }

    componentDidMount() {
        if (this.state.data === null) {
            // getData()
            let id = {
                _id: this.props.match.params.id
            }
            callApi('/myNews/getEdit', 'post', id)
                .then(
                    (res) => {
                        let prices = 0;
                        if (res.data.unit !== "Thỏa Thuận") {
                            if (res.data.unit === "Triệu") {
                                prices = res.data.price / 1000000;
                            } else {
                                prices = res.data.price / 1000000000;
                            }
                        }
                        let arr_data = [res.data]
                        this.setState({
                            txtBath: res.data.numberbath,
                            txtBad: res.data.numberbed,
                            price: prices,
                            txtPrice: prices,
                            data: arr_data,
                            oldLinkImage: res.data.image
                            // OldlinkImage:res
                        });
                        let disp = document.getElementById('display')
                        const price = document.getElementById('price');
                        if (res.data.name === "Đất Nền") {
                            disp.style.display = "none"
                        }
                        if (res.data.unit !== "Thỏa Thuận") {
                            price.style.display = "inline"
                        }


                    }
                )
        }
    }

    show_Img = (event) => {
        var file = document.getElementById('file').files
        var myNode = document.getElementById("displayImg");
        myNode.innerHTML = '';
        for (let i = 0; i < file.length; i++) {
            if (file.length > 0) {
                var fileToLoad = event.target.files[i] // lay hinh dau tien
                var fileReder = new FileReader();
                fileReder.onload = (fileLoaderEvent) => {
                    console.log(fileLoaderEvent.target);
                    var srcData = fileLoaderEvent.target.result // chueyn sang dang base 64
                    var newImg = document.createElement('img');
                    newImg.src = srcData;
                    document.getElementById("displayImg").innerHTML += newImg.outerHTML;
                }
                fileReder.readAsDataURL(fileToLoad);
            }
        }


    }
    getFile = (event) => {
        const fileImages = event.target.files
        if (fileImages.length > 0) {
            const fileImage = [];
            let arr_selectImg = event.target.files;
            for (let i = 0; i < arr_selectImg.length; i++) {
                fileImage.push(fileImages[i])
            }
            console.log(fileImage);
            this.setState({
                fileImage: fileImage
            });
            this.show_Img(event)
        }



    }
    getText = (event) => {
        var value = event.target.value
        var name = event.target.name;

        const price = document.getElementById('price');
        const unit = document.getElementById('unit');
        const name_title = document.getElementById('name');
        const disp = document.getElementById('display');
        const bath = document.getElementById('bath')
        const bad = document.getElementById('bad')
        
        if (name_title.value === "Đất Nền") {
            this.setState({
                txtBad: 0,
                txtBath: 0,
            });
            disp.style.display = "none"
        }
        else {
            this.setState({
                txtBad: bad.value,
                txtBath: bath.value,
            });
            disp.style.display = "inline"
        }
        if (unit.value === "Thỏa Thuận") {
            price.style.display = "none"
            this.setState({
                txtPrice: 0,
                price: null
            });
        } else {
            this.setState({
                txtPrice: price.value
            });
            price.style.display = "inline"
        }
        this.setState({
            [name]: value
        });

    }

    handleClick = async (e) => {
        e.preventDefault();
        let home = checkEdit();
        if (home === true) {
            let fileImage = this.state.fileImage;
            if (fileImage.length > 0) {
                const arr_linkImage = [];
                for (let i = 0; i < fileImage.length; i++) {
                    const fd = new FormData();
                    fd.append('file', fileImage[i])
                    fd.append("upload_preset", 'xku7xge7');
                    await callApi('https://api.cloudinary.com/v1_1/cuong/image/upload', 'post', fd)
                        .then(
                            (res) => {
                                const linkImg = {
                                    linkImage: res.data.secure_url
                                }
                                arr_linkImage.push(linkImg)
                            })
                }
                this.setState({
                    linkImage: arr_linkImage
                });

            }
            let price = "";
            if (this.state.txtPrice === 0) {
                price = this.state.price
            } else {
                price = this.state.txtPrice
            }
            console.log(price);
            const edit = [{
                txtKind: document.getElementById('kind').value,
                txtName: document.getElementById('name').value,
                txtTiltle: document.getElementById('title').value,
                txtDescription: document.getElementById('description').value,
                txtContent: document.getElementById('content').value,
                txtPrice: price,
                txtUnit: document.getElementById('unit').value,
                txtAdress: document.getElementById('address').value,
                txtSize: document.getElementById('size').value,
                txtBath: this.state.txtBath,
                txtBad: this.state.txtBad,
                txtName_user: document.getElementById('name_user').value,
                txtPhone: document.getElementById('phone').value,
                active: this.state.active,
                id_post: Cookies.get('id'),
                _id: this.props.match.params.id

            }]


            if (this.state.linkImage.length > 0) {
                edit.push(this.state.linkImage)
            } else {
                edit.push(this.state.oldLinkImage)
            }

            // postData(edit)
            callApi('/myNews/edit', 'post', edit).then(

            )
            this.setState({
                url: null
            });
        }




    }
    cancleSave = (e) => {
        e.preventDefault();
        this.setState({
            save: true
        });
    }
    image = () => {
        let data = this.state.data
        if (data !== null) {
            return data.map((value, key) => {
                if (value._id === this.props.match.params.id) {
                    return value.image.map((value, key) => {
                        return (
                            <Image cloudName="cuong" publicId={value.linkImage} />
                        )
                    })
                }

            })
        }

    }

    edit = () => {
        if (this.state.data !== null) {
            if (!Cookies.get('id') && !Cookies.get('username')) {
                return <Redirect to={this.state.url} />
            }
            if (this.state.url === null) {
                return <Redirect exact to='/myNews' />
            }
            return this.state.data.map((value, data) => {
                let prices = 0;
                if (value.unit !== "Thỏa Thuận") {
                    if (value.unit === "Triệu") {
                        prices = value.price / 1000000;
                    } else {
                        prices = value.price / 1000000000;
                    }
                }
                if (value._id === this.props.match.params.id) {
                    return (
                        <div className="postNew">
                            <Row>
                                <Col xs={10} sm={10} md={10} lg={10}>
                                    <div className="form-dangtin">
                                        <h4 className="info-post">*THÔNG TIN BẤT ĐỘNG SẢN</h4>
                                        <div className="form-dangtin-select">
                                            <span className="span-text">Nhu Cầu : </span>
                                            <select
                                                onChange={(event) => { this.getText(event) }}
                                                id="kind"
                                                name="txtKind"
                                                className="select-Text form-control"
                                            >
                                                <option value={value.kind}>{value.kind}</option>
                                                <option value="Cần Bán">Cần Bán</option>
                                                <option value="Cho Thuê">Cho Thuê</option>
                                            </select>
                                            &ensp;
                                            <span className="span-text" id={2}>Loại:</span>
                                            <select
                                                onChange={(event) => { this.getText(event) }}
                                                className="select-Text"
                                                id="name"
                                                name="txtName"
                                                className="select-Text form-control"
                                            >
                                                <option value={value.name}>{value.name}</option>
                                                <option value="Căn Hộ">căn hộ</option>
                                                <option value="Đất Nền">Đất nền</option>
                                            </select>
                                            &ensp;
                                            <span className="span-text" id={3}>Loại Chi Tiết : </span>
                                            <select
                                                onChange={(event) => { this.getText(event) }}
                                                className="select-Text"
                                                id="title"
                                                name="txtTiltle"
                                                className="select-Text form-control"

                                            >
                                                <option value={value.title}>{value.title}</option>
                                                <option value="Bất Động Sản Nổi Bật">Bất Động Sản Nổi Bật</option>
                                                <option value="Căn Hộ Trung Cư">Căn Hộ Trung Cư</option>
                                                <option value="Căn Hộ Mini">Căn Hộ Mini </option>
                                                <option value="Căn Hộ Tập Thể">Căn Hộ Tập Thể </option>
                                                <option value="Đất Nền">Đất Nền </option>
                                            </select>
                                        </div>
                                        <div className="body-post">
                                            <div className='body-title'>
                                                <span className="text-title" id={4}>Tiêu Đề : </span>
                                                <input
                                                    onChange={(event) => { this.getText(event) }}
                                                    defaultValue={value.decription}
                                                    type="text"
                                                    id="description"
                                                    name="txtDescription"
                                                    className="form-control"
                                                    placeholder="Tiêu Đề ..."
                                                />
                                            </div>
                                            {/* //------------------img */}


                                            <div className='description'>
                                                <p className="text-description" id={5}> Mô Tả : </p>
                                                <textarea
                                                    onChange={(event) => { this.getText(event) }}
                                                    name="txtContent"
                                                    id="content"
                                                    className="text-area form-control"
                                                    placeholder="Mô Tả.."
                                                    defaultValue={value.content} />
                                                <br />
                                            </div>
                                            <div className='address'>
                                                <span className="text-address" id={7}> Địa Chỉ : </span>
                                                <input
                                                    onChange={(event) => { this.getText(event) }}
                                                    defaultValue={value.adress}
                                                    type="text"
                                                    id="address"
                                                    name="txtAdress"
                                                    className="form-control"
                                                    placeholder="Địa Chỉ ..."
                                                />
                                            </div>
                                            <div className="prices_size">
                                                <span className='size'>
                                                    <span className="text-size" >Diện Tích : </span>
                                                    <select
                                                        onChange={(event) => { this.getText(event) }}
                                                        className="form-control"
                                                        id="size"
                                                        name="txtSize"
                                                    >
                                                        <option value={value.size}>{value.size} m2</option>
                                                        {this.size()}
                                                    </select>

                                                </span>
                                                <div className="prices">
                                                    <span className="text-price" id={6}>Giá : </span>
                                                    <input
                                                        defaultValue={prices}
                                                        onChange={(event) => { this.getText(event) }}
                                                        type="text"
                                                        id="price"
                                                        name="txtPrice"
                                                        className="form-control input-prices"
                                                        placeholder="Giá..."
                                                    />
                                                    <select onChange={(event) => { this.getText(event) }} className="form-control" id='unit' name="txtUnit">
                                                        <option value={value.unit}>{value.unit}</option>
                                                        <option value="Triệu">Triệu</option>
                                                        <option value="Tỷ">Tỷ</option>
                                                        <option value="Thỏa Thuận">Thỏa Thuận</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='option-buttom'>
                                                <div className="display" id="display">
                                                    <span className='bathroom'>
                                                        <span className="text-bathroom" id={9}>Phòng Tắm : </span>
                                                        <select
                                                            onChange={(event) => { this.getText(event) }}
                                                            className="select-show"
                                                            id="bath"
                                                            name="txtBath"
                                                            className="form-control"
                                                        >
                                                            <option value={value.numberbath}>{value.numberbath}</option>
                                                            {this.bathRoom()}
                                                        </select>
                                                    </span>
                                                    <span className='badroom'>
                                                        <span className="text-badroom" id={10}>Phòng Ngủ : </span>
                                                        <select
                                                            onChange={(event) => { this.getText(event) }}
                                                            className="select-show"
                                                            id="bad"
                                                            name="txtBad"
                                                            className="form-control"
                                                        >
                                                            <option value={value.numberbed}>{value.numberbed}</option>
                                                            {this.badRoom()}
                                                        </select>
                                                    </span>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="img">
                                                <span className="text-img" id='img' >Hình Ảnh Bất Động Sản</span> <br />
                                                <div className='border'  >
                                                    <input
                                                        onChange={(event) => { this.getFile(event) }}
                                                        multiple
                                                        type="file"
                                                        name="fileImage"
                                                        id="file"
                                                    />
                                                    <label className="icon-img" htmlFor="file"> <i class="fas fa-camera"></i></label>
                                                </div>
                                                <div className="slide_img" id='slide_img'>
                                                    <Row>
                                                        <span className="displayImg" id="displayImg">
                                                            {this.image()}
                                                            {/* <Col xs={3} sm={3} md={3} lg={3}>
                                                             
                                                            </Col> */}

                                                        </span>

                                                    </Row>
                                                </div>


                                            </div>
                                            <hr></hr>
                                            <div className="info">
                                                <h4 className="text-info"> *THÔNG TIN NGƯỜI ĐĂNG</h4>
                                                <div className="info-dangtin">
                                                    <Row>
                                                        <Col xs={6} sm={6} md={6} lg={6}>
                                                            <div className='name_user'>
                                                                <label for="name_user" className="text-name" id="txtName_user">Họ Tên:</label>
                                                                <input
                                                                    onChange={(event) => { this.getText(event) }}
                                                                    defaultValue={value.name_user}
                                                                    type="text"
                                                                    id="name_user"
                                                                    name="txtName_user"
                                                                    className="form-control"
                                                                    placeholder="Họ Tên...."
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs={6} sm={6} md={6} lg={6}>
                                                            <div className="phone">
                                                                <label for="phone" className="text-name" id="txtPhone">Số Điện Thoại :</label>
                                                                <input
                                                                    onChange={(event) => { this.getText(event) }}
                                                                    defaultValue={value.phone}
                                                                    type="text"
                                                                    id='phone'
                                                                    name="txtPhone"
                                                                    className="form-control"
                                                                    placeholder="Số Điện Thoại ..."
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <div className='btn'>
                                <Button onClick={(e) => { this.cancleSave(e) }} className='btn_Cancle'>Hủy</Button>
                                <Button className='btn_Post' onClick={(e) => { this.handleClick(e) }}>Lưu</Button>
                            </div>


                        </div>
                    )
                }
                return null;
            })
        }

    }


    //option
    size = () => {
        var arr = []
        for (let i = 0; i <= size; i++) {
            arr.push(i)
        }
        if (arr.length > 0) {
            return arr.map((value, key) => {
                return (

                    <option value={value}>{value} m2</option>


                )
            })
        }
    }
    bathRoom = () => {
        var arr = []
        for (let i = 0; i <= bad; i++) {
            arr.push(i)
        }
        if (arr.length > 0) {
            return arr.map((value, key) => {
                return (
                    <option value={value}>{value}</option>
                )
            })
        }
    }
    badRoom = () => {
        var arr = []
        for (let i = 0; i <= bad; i++) {
            arr.push(i)
        }
        if (arr.length > 0) {
            return arr.map((value, key) => {
                return (
                    <option value={value}>{value}</option>
                )
            })
        }

    }

    render() {
        if (this.state.save === true) {
            return <Redirect to='/myNews' />
        }
        return (
            <div>
                 <Header></Header>
                {this.edit()}
            </div>
        );
    }
}

export default Edit;