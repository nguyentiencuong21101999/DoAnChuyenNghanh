const Detail = require('../../models/web/detail')

module.exports.myNews = async (req, res) => {
    await Detail.find((err, data) => {
        res.send(data)
    }).then().catch((err) => console.log(err))

}

module.exports.getEdit = async (req, res) => {
    Detail.findById(req.body._id, (err, data) => {
        res.send(data)
    }).then().catch((err) => console.log(err))
}

module.exports.postEdit = async (req, res) => {
    console.log(req.body[0]);
    let prices = 0;
    if (req.body[0].txtUnit === "Triệu") {
        prices = req.body[0].txtPrice * 1000000;
    }
    if (req.body[0].txtUnit === "Tỷ") {
        prices = req.body[0].txtPrice * 1000000000;
    }
    await Detail.findByIdAndUpdate(req.body[0]._id, {
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

    }).then(console.log('thanh cong')).catch((err) => console.log(err))
}


module.exports.delete = async (req, res) => {
    await Detail.findByIdAndDelete(req.body.id).then(console.log('Deleted')).catch(err => console.log(err))
}