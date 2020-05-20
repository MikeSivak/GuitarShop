const {Router} = require('express');
const registration_controller = require('../controllers/registration.controller.js');
const registration_router = Router();

registration_router.use('/', registration_controller.registrateUsers);

module.exports = registration_router;