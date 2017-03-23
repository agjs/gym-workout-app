const router = require('express').Router();
const controller = require('./user.controller');
const isAuth = require('../utils/isAuth');

router.route('/').get(isAuth, controller.all);
router.route('/me').get(isAuth, controller.me);

module.exports = router;
