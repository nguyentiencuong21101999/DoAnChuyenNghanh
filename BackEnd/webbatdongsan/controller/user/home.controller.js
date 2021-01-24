const Detail = require('../../models/web/detail');
const Home = require('../../models/web/home')

module.exports.home =  (req, res) => {
   Detail.find({active:true},function (err, data) {
        if (err) {
            return res.json({ kq: 0 });
        } else {
            res.send(data);
        }
    });
    
}
module.exports.banner = async (req,res) =>{
   await Home.find( (err,data) => {
       res.send(data)
   }).then().catch((err) => {
       console.log(err);
   })

}
module.exports.sort = (req,res) => {
    const regex = new RegExp(fullTextSearchVi("cuong"), 'gi');
    let address =""
    let title ="nguyen tien cuong"
    // let name_user = ""
    Detail.find({decription:regex},(err,data) => {
        res.send(data)
    })
}