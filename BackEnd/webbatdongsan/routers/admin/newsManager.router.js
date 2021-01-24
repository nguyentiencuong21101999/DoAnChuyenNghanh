var express = require('express');
var router = express.Router();

const controller = require('../../controller/admin/newsManager.controller');

router.get('/', controller.newsManager);

router.post('/active', controller.active);

router.post('/delete',controller.delete);

router.get('/activeGmail/:id', controller.activeGmail)

module.exports = router;