const Detail = require('../../models/web/detail')
const Register = require('../../models/web/register')
 module.exports.postNews = async (req, res) => {
     let prices = 0;
     if(req.body[0].txtUnit === "Triệu"){
         prices = req.body[0].txtPrice * 1000000;
     }
     if(req.body[0].txtUnit ==="Tỷ"){
        prices = req.body[0].txtPrice * 1000000000;
     }
    let detail = new Detail(
        {   
        kind: req.body[0].txtKind,
        name: req.body[0].txtName,
        title: req.body[0].txtTiltle,
        image: req.body[1],
        decription: req.body[0].txtDescription,
        price: prices,
        unit: req.body[0].txtUnit,
        size: req.body[0].txtSize,
        content: req.body[0].txtContent,
        adress: req.body[0].txtAdress,
        active: req.body[0].active,
        numberbath: req.body[0].txtBath,
        numberbed: req.body[0].txtBad,
        name_user: req.body[0].txtName_user,
        phone: req.body[0].txtPhone,
        id_post: req.body[0].id_post
    })
    await detail.save((err, data) => {
        res.send(data)
    })
}

module.exports.getAccount = async(req,res) =>{
    Register.findById(req.body.id, (err,data) =>{
        res.send(data)

    })

}