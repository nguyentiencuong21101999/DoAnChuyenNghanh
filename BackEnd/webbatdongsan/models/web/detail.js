const mongoose = require('mongoose');
const detailSchema = new mongoose.Schema({
    kind:String,
    name: String,
    // image:{
    //     type:String,
    //     default:('null')
    // },
    image:[],
    title: String,
    decription: String,
    price: Number,
    unit:String,
    size: Number,
    content: String,
    adress: String,
    active: Boolean,
    numberbath:Number,
    numberbed:Number,
    name_user:String,
    phone:Number,
    id_post:String,
});
module.exports = mongoose.model("detail", detailSchema);