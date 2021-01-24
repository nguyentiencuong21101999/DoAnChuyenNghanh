var express = require('express');
var router = express.Router();

const controller = require('../../controller/user/postNews.router')

router.post('/', controller.postNews)
router.post('/getAccount',controller.getAccount)

module.exports = router;
