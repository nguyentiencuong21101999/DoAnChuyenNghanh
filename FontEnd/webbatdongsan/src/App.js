import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from './Components/User/Footer/Footer';
// import Banner from './Components/User/Header/Banner';
// import Header from './Components/User/Header/Header';
import routers from './RouterURL/RouterURL'
import Myaccount from './Components/User/Myaccount/Myaccount'
import Edit from './Components/User/Edit/Edit'
import DetailProduct from './Components/User/DetailProduct/DetailProduct';
//sell
import Sell from './Components/User/Sell/Sell';
import Apartment from './Components/User/Sell/Sell_Child/Apartment'
import ApartmentMini from './Components/User/Sell/Sell_Child/ApartmenMini'
import ApartmentGroup from './Components/User/Sell/Sell_Child/ApartmentGroup'
import Soil from './Components/User/Sell/Sell_Child/Soil'
//Lease

import Lease from './Components/User/Lease/Lease'
import Apartment_Lease from './Components/User/Lease/Lease_Child/Apartment'
import ApartmentMini_Lease from './Components/User/Lease/Lease_Child/ApartmenMini'
import ApartmentGroup_Lease from './Components/User/Lease/Lease_Child/ApartmentGroup'
import Soil_Lease from './Components/User/Lease/Lease_Child/Soil'

// admin
import Login_admin from './Components/Admin/Login/Login_admin'
import Home_admin from './Components/Admin/Home/Home_admin';
import helpClient from './Components/Admin/HelpClient/helpClient'
//socketIO
import socket from  './Components/SocKet/socket'



class App extends Component {
    showContentRoutes = () => {
        var result = null
        if (routers.length > 0) {
            result = routers.map((route, key) => {
                return (
                    <Route
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                )
            })
        }
        return result;
    }
    render() {

        return (
            <div>
                <Router>
                    <Switch>
                     
                        {this.showContentRoutes(routers)}
                        {/* <Route exact path="/sell/:id" component={DetailProduct} />
                        <Route path="/lease/:id" component={DetailProduct} /> */}

                        {/* Sell */}
                        <Route path="/DetailProduct/:id" component={DetailProduct} />
                        <Route exact path="/sell" component={Sell} />
                        <Route exact path="/sell/apartment" component={Apartment} />
                        <Route exact path="/sell/apartment-Mini" component={ApartmentMini} />
                        <Route exact path="/sell/apartment-group" component={ApartmentGroup} />
                        <Route exact path="/sell/soil" component={Soil} />

                        {/* Lease */}
                        <Route exact path="/lease" component={Lease} />
                        <Route exact path="/lease/apartment" component={Apartment_Lease} />
                        <Route exact path="/lease/apartment-Mini" component={ApartmentMini_Lease} />
                        <Route exact path="/lease/apartment-group" component={ApartmentGroup_Lease} />
                        <Route exact path="/lease/soil" component={Soil_Lease} />


                        <Route exact path="/myAccount" component={Myaccount} />
                        <Route exact path="/myNews/edit/:id" component={Edit} />
                        {/* // admin */}
                        <Route exact path="/home-admin" component={Home_admin} />
                        <Route exact path="/login-admin" component={Login_admin} />
                          {/* <Route exact path="/home-admin/helpclient" component={helpClient} /> */}
   

                         {/* socket */}
                         <Route exact path="/socket" component={socket} />
                    </Switch>
                
                    <Footer />
                   
                </Router>
            </div >
        );
    }
}
export default App;