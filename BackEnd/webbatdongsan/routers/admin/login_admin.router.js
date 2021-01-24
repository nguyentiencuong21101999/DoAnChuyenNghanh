var express = require('express');
var router = express.Router();

const controller = require('../../controller/admin/login_admin.controller')

router.post('/',controller.login_admin )


module.exports = router;