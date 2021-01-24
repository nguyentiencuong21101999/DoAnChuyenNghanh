 var Detail = require('../../models/web/detail')

 module.exports.detailProduct = (req, res) => {
    var id = req.body.id
    Detail.findById(id, (err, data) => {
        res.send(data)
    })

}