var express = require ('express');
var router = express.Router();

var controller = require('../../controller/user/sendMail.controller')
router.post('/', controller.sendMail)

module.exports = router;