import React, { Component } from 'react';
import General_Child from '../../../Partial/General_Filter_Child/General_Child'
class Apartment extends Component {
    render() {
        return (
            <div>
                <General_Child location={this.props}
                    kind={"Cần Bán"}
                    title ={"Căn Hộ Trung Cư"}
                    title_id = {"title_1"}
                />
            </div>
        );
    }
}

export default Apartment;