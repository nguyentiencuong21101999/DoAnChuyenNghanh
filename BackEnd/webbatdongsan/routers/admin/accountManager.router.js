var express = require('express');
var router = express.Router();

const controller = require('../../controller/admin/accountManager.controller');

router.get('/',controller.accountManager)

router.post('/deleteAccount',controller.deleteAccount)


module.exports = router;