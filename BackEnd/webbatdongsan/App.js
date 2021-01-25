var express = require('express');
var app = express();
const server = require('http').Server(app);
var io = require("socket.io")(server);
require('dotenv').config()

const mongoose = require('mongoose');

// app.set("view engine", "ejs");
// app.set("views", "./views");
app.use(express.static("public"));
//Search Vietnamese
const fullTextSearch = require('fulltextsearch');
var fullTextSearchVi = fullTextSearch.vi;
//Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//redis

//connect Mongoose
mongoose.connect(process.env.urlLocalhost, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (!err) {
        console.log("connected mongoose ... ");
    } else {
        console.log("fail connect mongoose");
    }
});
//user
const homeRouter = require('./routers/user/home.router');
const sellRouter = require('./routers/user/sell.router');
const loginRouter = require('./routers/user/login.router');
const registerRouter = require('./routers/user/register.router');
const myAccountRouter = require('./routers/user/myAccont.router');
const myNewsRouter = require('./routers/user/myNews.router');
const postNewsRouter = require('./routers/user/postNews.router');
const sendMailRouter = require('./routers/user/sendMail.router');
const detailProductRouter = require('./routers/user/detailProduct.router')
//#region  User
//Home
app.use('/home', homeRouter);
//Sell
app.use('/sell', sellRouter);
//detailProduct
app.use('/detailProduct', detailProductRouter)
//login
app.use('/login', loginRouter);
//register
app.use('/register', registerRouter);
//myAcount
app.use('/myAccount', myAccountRouter);
//myNews
app.use('/myNews', myNewsRouter);
//postNews
app.use('/postNews', postNewsRouter);
//sendMail
app.use('/sendMail', sendMailRouter);
//#endregion User
//Admin
const login_adminRouter = require('./routers/admin/login_admin.router');
const accountManagerRouter = require('./routers/admin/accountManager.router');
const newsManagerRouter = require('./routers/admin/newsManager.router');

//#region admin
//loginAdmin
app.use('/login_admin', login_adminRouter);
// account manager
app.use('/accountManager', accountManagerRouter)
//newsManager
app.use('/newsManager', newsManagerRouter)
//#endregion

const arr_mess = [];
const user = [];
io.on("connection", async (socket) => {

    //console.log("co nguoi ket noi " + socket.id);
    await socket.on('tao-room', (data) => {
            socket.join(data.username);  // push user in room
            if (user.indexOf(data.username) == -1) {
                user.push(data.username)
            }
            io.sockets.emit('user_online', user)
    })

    socket.on('client', (data) => {
        if (data.message.txt_mess !== '') {
            arr_mess.push(data.message)
        }
        const arr = []
        arr_mess.map((value) =>{
           if(data.to_client == value.rooms){
               arr.push(value)
           }
        })
        io.sockets.in(data.to_client).emit('sever', arr)
      
    })

    socket.on('leave_rooms',(data) =>{
        user.splice(user.indexOf(data), 1);
        socket.leave(data);
        io.sockets.emit('user_online', user)
        

    })

    socket.on("disconnect", () => {
        console.log(socket.id + " ngat ket noi");
    })

})


server.listen(4000, function () {
    console.log('App listening on port 4000!... ');
});

