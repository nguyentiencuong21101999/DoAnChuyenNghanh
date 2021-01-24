import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <Container>
            <Row>
                {/* SIDE-BAR LEFT */}
                <SidebarLeft />
                {/* HOME-CONTENT */}
                <Home />
            </Row>
        </Container>
        );
    }
}

export default HomePage;