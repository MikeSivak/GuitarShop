const {Router} = require('express');
const login_controller = require('../controllers/login.controller.js');
const login_router = Router();

login_router.use('/', login_controller.loginUsers);

module.exports = login_router;