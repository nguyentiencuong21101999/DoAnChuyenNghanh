const nodemailer = require("nodemailer");

module.exports.sendMail = (req, res) => {
    let price;
    if(req.body[0].txtPrice ===null){
        price= "Thỏa Thuận"

    }else{
        price = req.body[0].txtPrice + req.body[0].txtUnit
        console.log("2");
    }
    console.log(price);
    // bat truy cap kem an toan
    //https://myaccount.google.com/lesssecureapps
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'batdongsan.webdoan@gmail.com',
            pass: 'Tiencuong@123'
        }
    });
    var name_user = req.body[0].txtName_user
    var phone = req.body[0].txtPhone
    
    const mailOptions = {
        
        from: 'abc', // sender address
        to: 'nhokcuong159@gmail.com', // list of receivers
        subject: 'Duyệt Tin', // Subject line
        html:
        "---------------------------------------" +
        "<br>" +
        "|" + "Tên : " + name_user +           "|"
            + "<br/>" +
            "Số Điện Thoại : " + phone 
            + "<br/>" +
            "Loại : " + req.body[0].txtKind
            + "<br/>" +
            "Giá : " + price
            + "<br/>" +
            "Địa Chỉ : " + req.body[0].txtAdress
            + "<br/>" +
            "Nhấp Để Duyệt Bài : " + "http://localhost:4000/newsManager/activeGmail/" + req.body[2].id
    }

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
          
    })
}