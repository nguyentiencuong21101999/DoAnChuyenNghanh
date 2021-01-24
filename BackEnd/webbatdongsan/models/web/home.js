const mongoose = require('mongoose');
const homeSchema = new mongoose.Schema({
    category: [],
    city: [],
    size_level:[],
    value:[],
    funname: [],
    kids: [{
        type: mongoose.Schema.Types.ObjectId
    }]
});
module.exports = mongoose.model("home", homeSchema);   