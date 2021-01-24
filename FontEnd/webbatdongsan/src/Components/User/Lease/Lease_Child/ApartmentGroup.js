import React, { Component } from 'react';
import General_Child from '../../../Partial/General_Filter_Child/General_Child'
class ApartmentGroup extends Component {
    render() {
        return (
            <div>
                <General_Child location ={this.props}
                                kind={"Cho Thuê"}
                                title={"Căn Hộ Tập Thể"}
                                title_id={"title_3"}
                />        
            </div>
        );
    }
}

export default ApartmentGroup;