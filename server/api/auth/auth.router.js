const router = require('express').Router();
const controller = require('./auth.controller');

router.route('/login').post(controller.login);
router.route('/register').post(controller.register);
router.route('/logout').get(controller.logout);

module.exports = router;
