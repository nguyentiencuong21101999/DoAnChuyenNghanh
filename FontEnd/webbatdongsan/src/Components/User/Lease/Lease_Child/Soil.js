import React, { Component } from 'react';
import General_Child from '../../../Partial/General_Filter_Child/General_Child'
class Soil extends Component {
    render() {
        return (
            <div>
                <General_Child location={this.props}
                    kind={"Cho Thuê"}
                    title={"Đất Nền"}
                    title_id={"title_4"}
                />
            </div>
        );
    }
}

export default Soil;