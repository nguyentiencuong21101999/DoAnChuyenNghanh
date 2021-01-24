var express = require('express');
var router = express.Router();

const controller = require('../../controller/user/detailProduct.controller')
router.post('/',controller.detailProduct )

module.exports = router;