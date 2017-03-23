const router = require('express').Router();
const controller = require('./root.controller');

router.route('/').get(controller.getRoot);

module.exports = router;
