import React, { Component } from 'react';
import io from 'socket.io-client'
import Cookies from 'js-cookie'
import './socket.css'
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
const socket = io('/');
class sockets extends Component {
   constructor(props) {
      super(props);
      this.state = ({
         rooms: [],
         data: null,
         txt_mess: "",
         user_online: null,
         user_selected: "",
         show_chat: true,
         isActive: false,
         isClose: false,
      })

   }
   componentDidMount() {
      const user = {
         username: Cookies.get("username"),
         to_client: Cookies.get("username"),
         message: {
            rooms: Cookies.get("username"),
            username: Cookies.get("username"),
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

   getText = (event) => {
      const { name, value } = event.target;
      this.setState({
         [name]: value,

      });
   }
   send = async (e) => {
      e.preventDefault();
      this.setState({
         txt_mess: ""
      });

      const user = {
         username: Cookies.get("username"),
         to_client: this.state.user_selected,
         message: {
            rooms: this.state.user_selected,
            username: Cookies.get("username"),
            txt_mess: this.state.txt_mess
         }

      }
      await socket.emit("client", user)
      socket.on('sever', (data) => {
         console.log(data);
         this.setState({ data: data });
      })
      document.getElementById('scroll').scrollIntoView();
   }
   getUser = async (event) => {
      const { name, value } = event.target
      await this.setState({
         [name]: value,
         isClose: true,
         isActive: true
      });
      const user = {
         username: value,
         to_client: value,
         message: {
            rooms: value,
            username: Cookies.get("username"),
            txt_mess: this.state.txt_mess
         }
      }
      socket.emit('tao-room', user)
      socket.emit("client", user)
      socket.on('sever', (data) => {
         this.setState({ data: data });
      })
   }
   render() {
      const user_online = () => {
         const user_online = this.state.user_online;
         if (user_online) {
            return user_online.map(value => {
               return (
                  <div className="rowUser" onClick={(event) => { this.getUser(event) }}>
                     <input className="textNameUser" type='button' id='usera-selected' name='user_selected' value={value} /> <br></br>
                     <div className="circle"></div>
                  </div>
               )
            })
         }

      }
      const message = () => {
         const data = this.state.data;
         if (data) {
            return this.state.data.map(value => {
               return (
                  <div>
                     <span>{value.username} : </span>
                     <span>{value.txt_mess}  </span>
                  </div>
               )
            })
         }
      }
      const mess = () => {
         // const isClose = this.state.isClose;
         // const isActive = this.state.isActive;
         // if (isActive && isClose) {
         return (
            <Col xs={8} sm={8} md={8} lg={8}>
               <div className="form">
                  <div className="username"> <i class="fas fa-circle"></i> {this.state.user_selected}  <i onClick={() => { this.setState({ isActive: false, isClose: true }); }} class="fas fa-times icon-close"></i> </div>
                  <div className="show-message">
                     {message()}
                     <div id="scroll"></div>
                  </div>
                  <div className="send-message">
                     <Row>
                        <Col xs={8} sm={8} md={8} lg={8}>
                           <div className='txt_mess'>
                              <input className='form-control' id="text" type='text' name="txt_mess" value={this.state.txt_mess} onChange={(event) => { this.getText(event) }} id='text'></input>
                           </div>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                           <div className="btn-submit">
                              <input className="form-control send" onClick={(e) => { this.send(e) }} type='submit' value="gửi" />
                           </div>
                        </Col>
                     </Row>
                  </div>
                  <br></br>
               </div>
            </Col>
         )
         // }
      }
      window.scrollTo(0, 0);

      return (

         <div>
            <div className="icon-messenger" onClick={() => {
               this.setState({ isActive: true });
            }}>
               <div className={!this.state.isActive && this.state.isClose ? 'icons' : "icons active"} >
                  <i class="fab fa-facebook-messenger"></i>
               </div>
            </div>
            <div className="help-client">
               <Row>
                  <Col xs={4} sm={4} md={4} lg={4}>
                     <div className="user_online">
                        <Dropdown>
                           <Dropdown.Toggle variant="success" id="dropdown-basic">
                              < i class="fab fa-facebook-messenger"></i>
                           </Dropdown.Toggle>
                           <Dropdown.Menu>
                              {user_online()}
                           </Dropdown.Menu>
                        </Dropdown>

                     </div>
                  </Col>
               </Row>

            </div>

            <div className={this.state.isActive && this.state.isClose ? 'messenger active' : 'messenger'}>
               <Row>
                  {mess()}
               </Row>
            </div>
         </div>
      )
   }
}
export default sockets;