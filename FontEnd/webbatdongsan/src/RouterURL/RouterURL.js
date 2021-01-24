import React from 'react'
import Home from '../Components/User/Home/Home';
import Contact from '../Components/User/Contact/Contact';
import Blog from '../Components/User/Blog/Blog';
import Login from '../Components/User/Login/Login';
import Register from '../Components/User/Register/register';
import Postnews from '../Components/User/Postnews/Postnews';
import Mynews from '../Components/User/Mynews/Mynews';

const routers = [
    {
        path:'/',
        exact:true,
        main:() => <Home/>

    },
    {
        path:'/Contact',
        exact:true,
        main:() => <Contact/>

    },
    {
        path:'/Blog',
        exact:true,
        main:() => <Blog/>

    },
    {
        path:'/Login',
        exact:true,
        main:() => <Login/>

    },
    {
        path:'/Register',
        exact:true,
        main:() => <Register/>

    },
    // {
       
    //     path:'/DetailProduct',
    //     exact:true,
    //     main:() => <Contact />

    // },
    // {
    //     path:'/Sell',
    //     exact:true,
    //     main:() => <Sell/>

    // }, 
    {
        path:'/postnews',
        exact:false,
        main:( ) => <Postnews />

    }
    // {
    //     path:'/:id',
    //     exact:true,
    //     main:() => <Myaccount/>

    // }, 
    // ,{

    //     path:"/sell/:id",
    //     exact:true,
    //     main:() => <DetailProduct/>
    // }
    ,{
            path:"/myNews",
            exact:true,
            main:() => <Mynews/>
        }
      
];
export default routers;