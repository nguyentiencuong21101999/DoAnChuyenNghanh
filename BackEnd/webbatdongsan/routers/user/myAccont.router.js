var express = require('express');
var router = express.Router();

const controller = require('../../controller/user/myAccont.controller');

router.post('/',controller.myAccount);

router.post('/changeInfo', controller.changeInfo)

router.post('/changeAvatar',controller.changeAvatar )

module.exports = router;