const {Router} = require('express');
const user_controller = require('../controllers/user.controller.js');
const user_router = Router();

user_router.get('/', user_controller.getUsers);
user_router.post('/delete', user_controller.deleteUsers);
user_router.post('/save', user_controller.saveUsers);

module.exports = user_router;