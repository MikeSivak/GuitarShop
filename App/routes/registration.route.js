const {Router} = require('express');
const registration_controller = require('../controllers/registration.controller.js');
const registration_router = Router();

let User = require('../models/user.model');

registration_router.get('/', (req,res)=>{
    res.render("registration");
});

registration_router.post('/', registration_controller.registrateUsers);

module.exports = registration_router;