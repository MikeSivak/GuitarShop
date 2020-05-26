const { Router } = require('express');
const login_controller = require('../controllers/login.controller.js');
const login_router = Router();
// const bcrypt = require('bcryptjs');
const passport = require('passport').Strategy;

login_router.get('/', (req, res) => {
    res.render('login');
});
login_router.post('/', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.render('login', {
            title: 'Fill the all fields!'
        });
    }
    else{
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
    
},
    login_controller.loginUsers
);

// login_router.get('/:id', (req,res)=>{

// })

module.exports = login_router;