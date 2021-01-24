var express = require('express')
var router = express.Router();

const  controller = require('../../controller/user/myNews.controller')

router.get('/',controller.myNews)

router.post('/getEdit',controller.getEdit)

router.post('/edit', controller.postEdit)

router.post('/delete', controller.delete)

module.exports = router;