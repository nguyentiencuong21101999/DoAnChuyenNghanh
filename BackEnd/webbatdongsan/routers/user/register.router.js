var express = require('express');
var router = express.Router();

var controller = require('../../controller/user/register.controller')

router.post('/',controller.register )

module.exports = router;
