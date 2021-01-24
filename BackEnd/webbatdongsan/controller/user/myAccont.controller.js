var Register = require('../../models/web/register');

module.exports.myAccount = (req, res) => {
    Register.findById(req.body.id, (err, data) => {
        if (err) {
            console.log("k co du lieu");
        } else {
            res.send(data)
        }

    })

}

module.exports.changeInfo = (req, res) => {

    Register.findByIdAndUpdate(req.body.id, {
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname.trim(),
    }, (err, data) => {
        if (err) {
            res.json({ kq: 0 })
        } else {
            res.send(data)
        }
    })
}

module.exports.changeAvatar = (req, res) => {
    Register.findByIdAndUpdate(req.body.id, {
        img: req.body.img
    },
        (err, data) => {
            if (err) {
                res.json({ kq: 0 });
            } else {
                res.send(data)
            }
        })

}