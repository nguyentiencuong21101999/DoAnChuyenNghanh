import React, { Component } from 'react';
import Header from  '../Header/Header'
import Sell from '../Sell/Sell'
import General from '../../Partial/General_Filter/General'
import Sockets from '../../SocKet/socket';

class Lease extends Component {
    render() {
        return (
            <div>
                <Sockets></Sockets>
                <General location={this.props} 
                        kind={"Cho Thuê"}
                />
            </div>
        );
    }
}

export default Lease;