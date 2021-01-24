import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { NavLink, Redirect } from 'react-router-dom'
import Header from '../Header/Header'
import { Button, Row, Col } from 'react-bootstrap';
import check from '../Postnews/checkPost'

import callApi from '../../../Axios/callApi'
let [size, bad] = [120, 10];

class Postnews extends Component {
  constructor(props) {
    super(props);
    this.state = ({

      info: [],
      redirect: "/Login",
      checkRedirect: null,
      fileImage: [],

      cancle: false,
      check: false,
      data: null,
      selectedFile: null,
      showImg: false,
      //post ve node
      txtKind: null,
      txtName: null,
      txtTiltle: null,
      txtDescription: null,
      txtContent: null,
      txtPrice: null,
      txtUnit: null,
      txtAdress: null,
      txtSize: null,
      txtBath: null,
      txtBad: null,
      txtName_user: null,
      txtPhone: null,
      linkImage: [],
      active: false,
      id_post: null,
      _id: null,

      active: false
    })
  }
  componentDidMount() {
    if (Cookies.get("username") && Cookies.get("id")) {
      this.setState({
        redirect: "/postnews"
      });
    }
    const data = {
      id: Cookies.get("id")
    }
    callApi('/postNews/getAccount', 'post', data).then((res) => {
      const arr_info = [];
      console.log(res.data);
      arr_info.push(res.data);
      this.setState({
        info: arr_info
      });

    })
  }


  show_Img = (event) => {
    var file = document.getElementById('upload').files
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
    // const fileImage = []
    const fileImages = event.target.files
    if (fileImages.length > 0) {
      const fileImage = [];
      let arr_selectImg = event.target.files;
      for (let i = 0; i < arr_selectImg.length; i++) {
        fileImage.push(arr_selectImg[i])
      }
      this.setState({
        fileImage: fileImage
      });
      this.setState({
        showImg: true
      });
      this.show_Img(event)
    }



    // this.setState({
    //   fileImage:this.state.fileImage
    // })


  }
  getText = (event) => {
    var value = event.target.value;
    var name = event.target.name
    const dis_play = document.getElementById("name")
    const disp = document.getElementById('display');
    const price = document.getElementById('price');
    const unit = document.getElementById('unit');

    if (dis_play.value === "Đất Nền") {
      disp.style.display = "none"
    } else {
      disp.style.display = "block"
    }

    if (unit.value === "Thỏa Thuận") {
      price.style.display = "none"
      this.setState({
        txtPrice: null
      });
    }
    else {
      if (unit.value === "Triệu" || unit.value === "Tỷ") {
        price.style.display = "inline"
      }
      this.setState({
        txtPrice: price.value
      });
    }


    this.setState({
      [name]: value,
    });
  }
  cancleNews = (e) => {
    e.preventDefault();
    this.setState({
      cancle: true
    });
  }

  postNews = async (e) => {
    e.preventDefault();
    let home = check();
    //  console.log(home);
    if (home === true) {
      let fileImage = this.state.fileImage;
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
            }

          )
      }
      this.setState({
        linkImage: arr_linkImage
      });
      if ((this.state.txtBad && this.state.txtBath) === null) {
        this.setState({
          txtBad: 0,
          txtBath: 0
        });
      }
      // console.log(this.state.linkImage);
      const dataPost = [{
        txtKind: this.state.txtKind,
        txtName: this.state.txtName,
        txtTiltle: this.state.txtTiltle,
        txtDescription: this.state.txtDescription,
        txtContent: this.state.txtContent,
        txtPrice: this.state.txtPrice,
        txtUnit: this.state.txtUnit,
        // txtUnit: "Triệu",
        txtAdress: this.state.txtAdress,
        txtSize: this.state.txtSize,
        txtBath: this.state.txtBath,
        txtBad: this.state.txtBad,

        txtName_user: this.state.txtName_user,
        txtPhone: this.state.txtPhone,
        active: this.state.active,
        id_post: Cookies.get('id')
      },
      this.state.linkImage]
      callApi('/postNews', 'post', dataPost)
        .then(
       
          (res) => {
            var getId = {
              id: res.data._id
            }
            dataPost.push(getId);
            callApi('/sendMail', 'post', dataPost).then(

            )
          }
        )
      this.setState({
        checkRedirect: '/myNews'
      });

    }

  }
  // //đồng bộ ( chờ up img lee rồi trả về kết quả rồi mới làm tiếp)
  // // await cloudinary(fd) 





  //option
  //#region  option
  size = () => {
    var arr = []
    for (let i = 0; i <= size; i++) {
      arr.push(i)
    }
    if (arr.length > 0) {
      return arr.map((value, key) => {
        return (
          <option value={value}>{value}m2</option>
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
  //#endregion
  render() {
    if (!Cookies.get("username")) {
      return <Redirect exact to={this.state.redirect} />
    }
    if (this.state.checkRedirect !== null) {
      return <Redirect to={this.state.checkRedirect} />
    }
    if (this.state.cancle === true) {
      return <Redirect to='/' />
    }
    const info = () => {
      const info = this.state.info;
      if (info.length > 0) {

        return info.map((value, key) => {
          console.log(value.img);
          return (
            <div className="form_info_postNews">
              <Row>
                <Col xs={4} sm={4} md={4} lg={4}>
                  <div className='form_image'>
                    <div className='image'>
                      <img src={value.img} />
                    </div>
                  </div>


                </Col>
                <Col xs={8} sm={8} md={8} lg={8}>
                  <div className='form_info'>
                    <div className='fullname'>
                      {value.fullname}
                    </div>
                    <div className='fullname'>
                      {value.username}
                    </div>
                    <NavLink to="/myAccount">
                      <span>Thông Tin Tài Khoản</span>
                    </NavLink>

                  </div>

                </Col>
              </Row>

            </div>
          )

        })
      }
    }
    const price = this.state.txtPrice

    return (
      <div>
        <Header />
        <div className='add_page'>Home/Postnews</div>
        <div className="postNew">
          <Row>
            <Col xs={10} sm={10} md={10} lg={10}>
              <div className="form-dangtin">
                <h4 className="info-post">*THÔNG TIN BẤT ĐỘNG SẢN</h4>
                <div className="form-dangtin-select">
                  <span className="span-text">Nhu Cầu : </span>
                  <select onChange={(event) => { this.getText(event) }} className="select-Text form-control" id="kind" name="txtKind">
                    <option value="">--Type</option>
                    <option value="Cần Bán">Cần Bán</option>
                    <option value="Cho Thuê">Cho Thuê</option>
                  </select>
                  &ensp;
                  <span className="span-text">Loại : </span>
                  <select onChange={(event) => { this.getText(event) }} className="select-Text form-control" id="name" name="txtName">
                    <option value="">--Type</option>
                    <option value="Căn Hộ">căn hộ</option>
                    <option value="Đất Nền">Đất nền</option>
                  </select>
                  &ensp;
                  <span className="span-text" id={3}>Loại Chi Tiết : </span>
                  <select onChange={(event) => { this.getText(event) }} className="select-Text form-control" id="title" name="txtTiltle">
                    <option value="">--Type</option>
                    <option value="Bất Động Sản Nổi Bật">Bất Động Sản Nổi Bật</option>
                    <option value="Căn Hộ Trung Cư">Căn Hộ Trung Cư</option>
                    <option value="Căn Hộ Mini">Căn Hộ Mini </option>
                    <option value="Căn Hộ Tập Thể">Căn Hộ Tập Thể </option>
                    <option value="Đất Nền">Đất Nền </option>
                  </select>
                </div>
                <div className="body-post">
                  <div className='body-title'>
                    <span className="text-title" id={4}> Tiêu Đề : </span>
                    <input onChange={(event) => { this.getText(event) }} className="form-control" type="text" id="description" name="txtDescription" cols={30} rows={10} placeholder="Tiêu Đề ..." /> <br />
                  </div>

                  <div className='description'>
                    <p className="text-description" id={5}> Mô Tả : </p>
                    <textarea onChange={(event) => { this.getText(event) }} name="txtContent" id="content" className="text-area form-control" placeholder="Mô Tả.." cols={30} rows={5} defaultValue={""} /> <br />
                  </div>
                  <div className='address'>
                    <span className="text-address" id={7}> Địa Chỉ : </span>
                    <input onChange={(event) => { this.getText(event) }} className="form-control" type="text" id="address" name="txtAdress" placeholder="Địa Chỉ ..." />
                  </div>
                  <div className="prices_size">
                    <span className='size'>
                      <span className="text-size" id={8}>Diện Tích : </span>
                      <select onChange={(event) => { this.getText(event) }} className="form-control" id="size" name="txtSize">
                        {this.size()}
                      </select>
                    </span>
                    <div className="prices">
                      <span className="text-price" id={6}>Giá : </span>
                      <input onChange={(event) => { this.getText(event) }} value={price} className="form-control input-prices" id="price" type="text" name="txtPrice" placeholder="Giá..." />
                      <select onChange={(event) => { this.getText(event) }} className="form-control" id="unit" name="txtUnit">
                        <option value="">--Type</option>
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
                        <select onChange={(event) => { this.getText(event) }} className="form-control" id="bath" name="txtBath">
                          {this.bathRoom()}
                        </select>
                      </span>
                      <span className='badroom'>
                        <span className="text-badroom" id={10}>Phòng Ngủ : </span>
                        <select onChange={(event) => { this.getText(event) }} className="form-control" id="bad" name="txtBad">
                          {this.badRoom()}
                        </select>
                      </span>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="img">
                    <span className="text-img" id='img' >Hình Ảnh Bất Động Sản</span> <br />
                    <div className='border'  >
                      <input onChange={(event) => { this.getFile(event) }} multiple type="file" name="fileImage" id="upload" />
                      <label className="icon-img" htmlFor="upload"> <i class="fas fa-plus-circle"></i></label>

                    </div>
                    <div className="slide_img" id='slide_img'>
                      <Row>
                        <span className="displayImg" id="displayImg">
                          <Col xs={3} sm={3} md={3} lg={3}>
                            <i class="far fa-images"></i>
                          </Col>
                        </span>
                      </Row>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className="info">
                  <h4 className="text-info"> *THÔNG TIN NGƯỜI ĐĂNG</h4>
                  <div className="info-dangtin">
                    <Row>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <div className='name_user'>
                          <label for="name_user" className="text-name" id={11}>Họ Tên:</label>
                          <input onChange={(event) => { this.getText(event) }} className="form-control" type="text" id="name_user" name="txtName_user" placeholder="Họ Tên...." /> <br />
                        </div>
                      </Col>
                      <Col xs={6} sm={6} md={6} lg={6}>
                        <div className="phone">
                          <label for="phone" className="text-name" id={12}>Số Điện Thoại :</label>
                          <input onChange={(event) => { this.getText(event) }} className="form-control" id="phone" type="text" name="txtPhone" placeholder="Số Điện Thoại ..." />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className='btn'>
                  <Button onClick={(e) => { this.postNews(e) }} className='btn_Post'> Đăng Tin</Button>
                  <Button onClick={(e) => { this.cancleNews(e) }} className='btn_Cancle'>Hủy</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div >

    );
  }
}

export default Postnews;