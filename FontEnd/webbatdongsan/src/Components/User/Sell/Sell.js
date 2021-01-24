import React, { Component } from 'react';
import General from '../../Partial/General_Filter/General'
import Sockets from '../../SocKet/socket';
class Sell extends Component {
    render() {
        return (
            <div>
                <Sockets/>
                <General location={this.props}
                    kind={"Cần Bán"}
                />
            </div>
        );
    }
}

export default Sell;


