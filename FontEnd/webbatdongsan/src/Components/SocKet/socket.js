import React, { Component } from 'react';
import Header from '../User/Header/Header';
import io from 'socket.io-client';
import cookies from 'js-cookie'
import callApi from '../../Axios/callApi';
import { Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
var socket = io();
const arr = []
class sockets extends Component {
   constructor(props) {
      super(props);
      this.state = {
         endpoint: "",
         rooms: [],
         data: "",
         socket: false,
         active: false,
         txt_mess: "",
         user_online: null,
         isActive: false,
         redirect: false

      }
   }
   componentDidMount() {
      if (cookies.get('username')) {
         const user = {
            username: cookies.get('username'),
            to_client: cookies.get("username"),
            message: {
               rooms: cookies.get("username"),
               username: cookies.get("username"),
               txt_mess: this.state.txt_mess
            }
         }
         socket.emit('tao-room', user)
         socket.on('user_online', (data) => {
            this.setState({
               user_online: data
            });
         })

         socket.emit("client", user)
         socket.on('sever', (data) => {
            console.log(data);
            this.setState({ data: data });
         })
      }

   }
   componentWillUnmount() {
      // socket.emit('leave_rooms',cookies.get("username"));
      // socket.on('user_online', (data) => {
      //     this.setState({
      //         user_online: data
      //     });
      // })
   }
   getText = (event) => {
      const { name, value } = event.target;
      console.log(name);
      console.log(value);
      this.setState({
         [name]: value
      });
   }
   send = async (e) => {
      // e.preventDefault();
      this.setState({
         txt_mess: ""
      });
      const user = {
         username: cookies.get('username'),
         to_client: cookies.get("username"),
         message: {
            rooms: cookies.get("username"),
            username: cookies.get("username"),
            txt_mess: this.state.txt_mess
         }
      }

      await socket.emit("client", user)
      socket.on('sever', (data) => {
         this.setState({ data: data });
      })

   }
   isCheckLogin = () => {

   }

   render() {
      const message = () => {
         const data = this.state.data;
         if (data.length > 0) {
            return this.state.data.map(value => {

               return (
                  <div className={value.username == cookies.get("username") ? "client" : "admin"}>
                     {/* <span className="name">:{value.username}</span> */}
                     <span className="content"> {value.txt_mess}</span>
                     <br></br>     <br></br>
                  </div>
               )


            })
         }
      }
      const chat = () => {
         if (this.state.redirect) {
            return <Redirect to='login' />
         }
         if (cookies.get("username") && cookies.get("id")) {
            return (
               <div className={this.state.isActive ? 'socket active' : 'socket'}>
                  <Row>
                     <Col xs={8} sm={8} md={8} lg={8}>
                        <div className='socket__content'>
                           <div className='username'> <i class="fas fa-circle"></i> Liên hệ với chúng tôi ...  <i onClick={() => { this.setState({ isActive: false }); }} class="fas fa-times icon-close"></i></div>
                           <div className="message">
                              {message()}
                           </div>
                           <Row>
                              <Col xs={8} sm={8} md={8} lg={8}>
                                 <div className="txt-mess">
                                    <input type='text' className='form-control' placeholder='Message...' value={this.state.txt_mess} name="txt_mess" onChange={(event) => { this.getText(event) }} id='text'></input>

                                 </div>
                              </Col>
                              <Col xs={4} sm={4} md={4} lg={4}>
                                 <div className='btn-submit'>
                                    <input className="form-control" onClick={(e) => { this.send(e) }} type='submit' value="Send" placeholder='Liên Hệ Với Chung Tôi ...' />
                                 </div>
                              </Col>
                           </Row>
                        </div>

                     </Col>
                  </Row>
               </div>
            )
         }
      }
      return (
         <div>
            <div className="icon-messenger" onClick={() => {
               if (!cookies.get("username") && !cookies.get("id")) {
                  this.setState({
                     redirect: true
                  });
               }
               this.setState({
                  isActive: true
               });
            }}>
               <div className={this.state.isActive ? "icon active" : 'icon'} >
                  <i class="fab fa-facebook-messenger iconFb"></i>
               </div>
            </div>
            {chat()}
         </div>
      )
   }




}


export default sockets;