const {Router} = require('express');
const content_controller = require('../controllers/content.controller.js');
const content_router = Router();
const auth = require('../middleware/auth')

content_router.get('/', content_controller.getContent);             //get all contents
content_router.get('/:id', content_controller.getDescription)
content_router.post('/sort', content_controller.getGuitarsByCondition);

content_router.post('/buy', auth, content_controller.buyGuitar);

module.exports = content_router;