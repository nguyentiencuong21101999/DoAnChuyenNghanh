import React, { Component } from 'react';
import axios from 'axios'
import callApi from '../../../Axios/callApi'
import Header from '../Header/Header';
class Contact extends Component {
   constructor(props) {
      super(props);
      this.state = ({
         dataImg: [],
         img: false

      })
   }
   componentDidMount() {
      callApi('/home', 'get').then()
   }
   getText = (event) => {
   }

   a = async (img) => {
      for (let i = 0; i < img.length; i++) {
         const fd = new FormData();
         fd.append('file', img[i])
         // fd.append('publicId', "abc")
         fd.append("upload_preset", 'xku7xge7');
         await axios.post('https://api.cloudinary.com/v1_1/cuong/image/upload', fd).then((res) => {
            let arr_img = this.state.dataImg;
            arr_img.push({ img: res.data.secure_url })
         })
      }
      this.setState({
         img: true
      });




   }
   handleFileUpload = (e) => {
      let img = document.getElementById('img').files
      this.a(img)
      // arrImg.push(event.target.files)
      e.preventDefault();
      //upload len cloudinary


   }
   render() {
      let img = () => {
         if (this.state.dataImg.length > 0) {
            console.log(this.state.dataImg);
            return this.state.dataImg.map((value, key) => {
               return (
                  <img style={{ width: "100px" }} src={value.img} />
               )

            })
         }
      }

      return (
         <div>
            <Header></Header>
            <br></br>
            <br></br>
            <input multiple onChange={(event) => { this.getText(event) }} type="file" id='img'></input>
            <br></br>
            <button onClick={(e) => { this.handleFileUpload(e) }}>submit</button>
            {img()}
         </div>
      );
   }
}

export default Contact;