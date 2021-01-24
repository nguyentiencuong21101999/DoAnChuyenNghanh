
const Register = require('../../models/web/register')

module.exports.login = (req, res) => {
    console.log(req.body.username);
    var username = req.body.username;
    var password = req.body.password;
    Register.findOne({ username: username, password: password }, (err, data) => {
        res.send(data)
    })

}