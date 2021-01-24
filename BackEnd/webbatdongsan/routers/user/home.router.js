var express = require('express');
var router = express.Router();

var controller = require('../../controller/user/home.controller')

router.get('/',controller.home);
router.get('/banner',controller.banner)

module.exports = router;