var Register = require('../../models/web/register')
module.exports.register = (req, res) => {
    let  username = req.body.username;
    Register.findOne({username:username}, (err,data) => {
        if(data){
            res.send(false)
        }else{
            res.send(true)
            if (req.body.username && req.body.password && req.body.fullname) {
                var register = new Register({
                    username: req.body.username,
                    password: req.body.password,
                    fullname: req.body.fullname,
        
                })
                register.save((err) => {
                    if (err) {
                        return res.json({ kq: 0 });
                    }
                });
            }
        
        }
        
    
    })
   
}