
var Register = require('../../models/web/register')

module.exports.login_admin = async (req, res) => {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    if (username === 'admin' && password === 'admin') {
        await Register.findOne({ username: username, password: password }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ data, msg: 'Đăng Nhập Thành Công' });
            }
        })
    } else {
        var msg = { msg: 'Đăng Nhập Thất Bại' }
        res.send(msg)
    }
}