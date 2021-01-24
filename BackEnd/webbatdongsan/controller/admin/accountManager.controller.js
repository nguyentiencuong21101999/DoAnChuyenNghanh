var Register = require('../../models/web/register')

module.exports.accountManager =  async (req, res) => {
    await Register.find((err, data) => {
        res.send(data)
    })
        .then(console.log('thanh cong'))
        .catch((err) => {
            console.log(err);
        })
}
module.exports.deleteAccount =  async (req, res) => {
    var id = req.body.id;
    Register.findByIdAndDelete(id, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('deleted');
        }
    })
}