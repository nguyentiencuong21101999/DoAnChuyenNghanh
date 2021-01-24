import React from 'react';
import './Blog.css'
import Header from '../Header/Header'
function Blog() {

    return (
        <>
            <Header />
            <div className="Blog" >
                <img src="https://cdn.dribbble.com/users/975866/screenshots/5546737/settings.png" alt="dasd" />
                <p className="notifications">Đang phát triển ...</p>
            </div>
        </>

    );
}

export default Blog;