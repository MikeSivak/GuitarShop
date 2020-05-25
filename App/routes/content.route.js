const {Router} = require('express');
const content_controller = require('../controllers/content.controller.js');
const content_router = Router();

content_router.get('/', content_controller.getContent);             //get all contents
content_router.get('/:id', content_controller.getDescription)


// content_router.post('/:id', content_controller);

module.exports = content_router;