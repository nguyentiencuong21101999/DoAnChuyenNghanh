var Detail = require('../../models/web/detail')

module.exports.newsManager = async (req, res) => {
    await Detail.find((err, data) => {
        res.send(data)
    })
}

module.exports.active = (req, res) => {
    console.log(req.body);
    var id = req.body.id;
    Detail.findByIdAndUpdate(id, {
        active: true
    })
        .then(
            res.json({
                status: "success",
                Time: new Date(),
                message: " Duyệt Tin Thành Công"
            })
        ).catch((err) => {
            console.log(err);
        })
}

module.exports.delete = (req, res) => {
    console.log(req.body);
    var id = req.body.id;
    Detail.findByIdAndDelete(id).then(console.log('thanh cong')).catch((err) => {
        console.log(err);
    })
}

module.exports.activeGmail = (req, res) => {
    var id = req.params.id;
    Detail.findByIdAndUpdate(id, {
        active: true
    })
        .then(
            res.json({
                status: "success",
                Time: new Date(),
                message: " Duyệt Tin Thành Công"
            }))
        .catch((err) => {
            console.log(err);
        })
}