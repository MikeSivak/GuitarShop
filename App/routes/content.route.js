const {Router} = require('express');
const content_controller = require('../controllers/content.controller.js');
const content_router = Router();

content_router.get('/', content_controller.getContent);             //get all contents


module.exports = content_router;