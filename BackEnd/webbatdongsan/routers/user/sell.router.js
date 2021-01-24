var express = require('express');
var router = express.Router();

const controller = require('../../controller/user/sell.controller')

router.post('/search',controller.search);
router.get('/filter',controller.filter);
router.post('/filter',controller.postFilter)

module.exports = router;