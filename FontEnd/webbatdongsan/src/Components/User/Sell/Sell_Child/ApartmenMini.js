import React, { Component } from 'react';
import General_Child from '../../../Partial/General_Filter_Child/General_Child'
class ApartmenMini extends Component {
    render() {
        return (
            <div>
                <General_Child location ={this.props}
                                kind={"Cần Bán"}
                                title={"Căn Hộ Mini"}
                                title_id ={"title_2"}

                />
            </div> 
        );
    }
}

export default ApartmenMini;