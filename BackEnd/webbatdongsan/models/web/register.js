const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    img:{
        type:String,
        default:('https://res.cloudinary.com/cuong/image/upload/v1604400419/default-avatar.jpg')
    }
})
module.exports = mongoose.model("register", registerSchema);