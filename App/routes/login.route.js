const { Router } = require('express');
const login_controller = require('../controllers/login.controller.js');
const login_router = Router();
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth');

login_router.get('/', (req, res) => {
    res.render('login');
});
// login_router.post('/', [auth, [
//     check('email', 'Email is required')
//         .not()
//         .isEmpty(),
//     check('password', 'Password is required')
//         .not()
//         .notEmpty()
// ]],
//     login_controller.loginUsers
// );

// login_router.get('/:id', (req,res)=>{

// })

module.exports = login_router;