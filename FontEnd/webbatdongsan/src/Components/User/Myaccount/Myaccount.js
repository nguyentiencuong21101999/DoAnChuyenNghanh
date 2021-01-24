import React, { Component } from 'react';

import Cookies from 'js-cookie'
import axios from 'axios'
import { Image } from 'cloudinary-react';
import { Redirect } from 'react-router-dom'

import Header from '../Header/Header';

import callApi from '../../../Axios/callApi'
import checkAccount from './checkAccount'
import './Profile.css'
class Myaccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            img: "",

            active: false,
            cancle: false,

            username: "",
            password: "",
            fullname: "",

            cr_username: "",
            cr_password: "",
            cr_fullname: "",


            selectedFile: null,
            img_Url: null,

            saveBtn: false,
            showImg: false,
            showPass: false,
            showButton: true
        }
    }
    componentDidMount() {
        // lay data  = id 
        var id = {
            id: Cookies.get("id")
        }
        callApi('/myAccount', 'post', id)
            .then(
                (res) => {
                    var result = res.data;
                    var arr = [];
                    arr.push(result);
                    this.setState(
                        {
                            data: arr,
                            fullname: result.fullname,
                            username: result.username,
                            password: result.password,
                            img: result.img
                        }
                    );
                }
            )
    }


    // thay doi avatar-----------------------------------------
    show_Img = (event) => {
        var file = document.getElementById('upload').files

        if (file.length > 0) {
            var fileToLoad = event.target.files[0] // lay hinh dau tien
            var fileReder = new FileReader();
            fileReder.onload = (fileLoaderEvent) => {
                var srcData = fileLoaderEvent.target.result // chueyn sang dang base 64
                var newImg = document.createElement('img');
                newImg.src = srcData;
                document.getElementById("displayImg").innerHTML = newImg.outerHTML;
            }
            fileReder.readAsDataURL(fileToLoad);
        }
    }
    getTextFilename = async (event) => {
        console.log(event.target.files);
        this.setState({
            selectedFile: event.target.files[0],
            saveBtn: true,
            showImg: true
        });
        // hien thi anh truoc khi upload
        await this.show_Img(event);

    }

    handleFileUpload = async (e) => {
        e.preventDefault();
        //upload len cloudinary
        const fd = new FormData();
        fd.append('file', this.state.selectedFile)
        fd.append('publicId', "abc")
        fd.append("upload_preset", 'xku7xge7');

        await callApi('https://api.cloudinary.com/v1_1/cuong/image/upload', 'post', fd)
            .then(
                (res) => {
                    //cloud tra ve`
                    const img = res.data.secure_url;
                    this.setState({
                        img: img,
                        saveBtn: false,
                    });
                    localStorage.setItem('img', img);
                    const avatar = {
                        id: Cookies.get("id"),
                        img: img

                    }
                    callApi('/myAccount/changeAvatar', 'post', avatar)
                        .then((res) => {
                        })
                    this.setState({
                        showImg: false
                    });
                }

            )
        let img = localStorage.getItem("img");
        console.log(img);
        this.setState({
            img: img,

        });
    }
    cancleFileUpload = (e) => {
        e.preventDefault();
        this.setState({
            saveBtn: false,
            showImg: false
        });
    }
    //kiem tra dữ liệu trong o text
    checkAccount = () => {
        let fullname = document.getElementById('fullname').value;
        let password = document.getElementById('password').value;

        let msg_fullname = document.getElementById('msg_fullname')
        let msg_password = document.getElementById('msg_password')

        if (fullname.length < 3 || fullname.length > 20) {
            msg_fullname.innerHTML = '* Tên Phải Từ 3 => 20 kí tự'
        } else {
            msg_fullname.innerHTML = ''
        }

        if (password.length < 6 || password.length > 30) {
            msg_password.innerHTML = '* Tên Phải Từ 6 => 30 kí tự'
        } else {
            msg_password.innerHTML = ''
        }
    }
    //thay doi thong tin tai khoan
    changeAccount = (e) => {
        e.preventDefault();
        this.setState({
            active: true,
            showPass: false,
            cr_username: this.state.username,
            cr_password: this.state.password,
            cr_fullname: this.state.fullname.trim(),

        });
    }
    getText = (event) => {
        const { value, name } = event.target
        this.setState({
            [name]: value
        })
        //triger
        // this.checkAccount()

    }
    change = (e) => {
        console.log(checkAccount());
        if (checkAccount() === true) {
            console.log("zo roi");
            e.preventDefault();
            Cookies.set("username", this.state.username)
            Cookies.set("fullname", this.state.fullname.trim())
            //post value ve nodejs
            console.log(this.state.fullname.trim().length);
            const change = {
                fullname: this.state.fullname.trim(),
                username: this.state.username,
                password: this.state.password,
                id: Cookies.get("id")
            }
            callApi('/myAccount/changeInfo', 'post', change)

            this.setState({
                active: false
            });

        }


    }
    unChange = (e) => {
        e.preventDefault();
        this.setState({
            active: false,
            username: this.state.cr_username,
            password: this.state.cr_password,
            fullname: this.state.cr_fullname.trim(),
        });
    }
    //hien thi pass
    eyeOn = (e) => {
        e.preventDefault();
        this.setState({
            showPass: true
        });

    }
    eyeOff = (e) => {
        e.preventDefault();
        this.setState({
            showPass: false
        });

    }

    render() {
        console.log("1");
        if (!Cookies.get("username")) {
            return <Redirect exact to="/login" />
        }
        const displayImg = () => {
            if (this.state.showImg) {
                return <div className="displayImg" id="displayImg"></div>
            }
        }
        const saveBtn = () => {
            if (this.state.saveBtn) {
                return (
                    <div className='btn'>
                        <div className='cancleBtn'>
                            <button
                                className='btn btn-warning'
                                onClick={(e) => { this.cancleFileUpload(e) }}
                            >
                                Hủy Bỏ
                            </button>
                        </div>
                        <div className='saveBtn'>
                            <button
                                className='btn btn-primary'
                                onClick={(e) => { this.handleFileUpload(e) }}
                            >
                                Lưu
                                </button>
                        </div>
                    </div>
                )
            }
        }
        const showPass = () => {
            if (this.state.showPass === false) {
                return (
                    <div className="password">
                        <p> Password : </p>
                        <input name='password'
                            onChange={(event) => { this.getText(event) }}
                            ref="password"
                            defaultValue={this.state.password}
                            type="password"
                            id='password'
                            className='form-control'
                        />
                        <i onClick={(e) => { this.eyeOn(e) }} class="fas fa-eye"></i>
                        <span id='msg_password' className='msg_password'></span>

                    </div>
                )
            } else {
                return (
                    <div className="password">
                        <p> Password : </p>
                        <input name='password'
                            onChange={(event) => { this.getText(event) }}
                            ref="password"
                            defaultValue={this.state.password}
                            type="text"
                            id='password'
                            className='form-control'
                        />
                        <i onClick={(e) => { this.eyeOff(e) }} class="fas fa-low-vision"></i>
                        <span id='msg_password' className='msg_password'></span>

                    </div>
                )
            }
        }
        const showButton = () => {
            // let fullname = this.state.fullname.trim();
            // let cr_fullname = this.state.cr_fullname;
            // let password = this.state.password;
            // let cr_password = this.state.cr_password;
            if (this.state.showButton === true) {
                return (
                    <div className='btn_Save'>
                        <button className=' btnCancle btn btn-secondary' onClick={(e) => { this.unChange(e) }} >Hủy</button>
                        <button className=' btnSave btn btn-secondary' onClick={(e) => { this.change(e) }} >Thay Đổi </button>
                    </div>
                )
            }
        }
        const myAccount = () => {
            if (this.state.data !== null) {
                if (this.state.active === false) {
                    return (
                        <div className="myAccount">
                            <input
                                onChange={(event) => { this.getTextFilename(event) }}
                                multiple
                                type="file"
                                name="img"
                                className='input-avatar'
                                id="upload"
                            />
                            <div className='cover_image'>
                                <Image className="backgroudProfile" cloudName="cuong" publicId='https://res.cloudinary.com/cuong/image/upload/v1607018152/anh-bia-phong-canh-dep-30.jpg' />
                            </div>
                            {displayImg()}
                            <div className="img">
                                <Image cloudName="cuong" publicId={this.state.img} />
                                <label className='selectImg form-control' for='upload' >Chọn Ảnh</label>
                            </div>
                            {saveBtn()}
                            <div className='show_info'>
                                <div className='name'>
                                    <p> Tên :</p> {this.state.fullname.trim()}

                                </div>
                                <div className='username'>
                                    <p>Tên Người Dùng :</p> {this.state.username}
                                </div>
                                <div className="password">
                                    <p> Password : </p> {this.state.password}
                                </div>
                            </div>
                            <button className='btnChange btn btn-secondary' onClick={(e) => this.changeAccount(e)} >Thay Đổi Thông Tin Tài Khoản</button>
                        </div>
                    )
                } else {
                    if (this.state.active === true) {
                        return this.state.data.map((value, key) => {
                            return (
                                <div className="myAccount">
                                    <div className='cover_image'>
                                        <Image cloudName="cuong" publicId='https://res.cloudinary.com/cuong/image/upload/v1605505807/anh-bia-phong-canh-dep-30.jpg' />
                                    </div>
                                    <div className="img_changeAccount">
                                        <Image cloudName="cuong" publicId={this.state.img} />
                                    </div>
                                    <div className='show_info'>
                                        <div className='name'>
                                            <p> Tên : </p>
                                            <input name='fullname'
                                                onChange={(event) => { this.getText(event) }}
                                                ref="fullname"
                                                defaultValue={this.state.fullname.trim()}
                                                type="text"
                                                id='fullname'
                                                className='form-control'
                                            />
                                            <span id='msg_fullname' className='msg_fullname'></span>
                                        </div>
                                        <div className='username'>
                                            <p>Tên Người Dùng : </p> {this.state.username}
                                        </div>
                                        {showPass()}
                                    </div>
                                    {showButton()}
                                </div>
                            )
                        })
                    }
                }
            }
        }
        return (
            <div>
                <Header img={this.state.img}></Header>
                { myAccount()}
            </div >
        );

    }


}

export default Myaccount;