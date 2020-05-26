const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const { check, validationResult } = require('express-validator')
// const passport = require('passport');
// const LocalStrategy  = require('passport-local').Strategy;



exports.loginUsers = async (req, res) => {

    // try{
    //     passport.authenticate(new LocalStrategy({
    //         emailField: 'email',
    //         passwordField: 'password'
    //       }, function(email, password,done){
    //         User
    //         .findOne({where:{email : email}},function(err,user){
    //           return err 
    //             ? done(err)
    //             : user
    //               ? password === user.password
    //                 ? done(null, user)
    //                 : done(null, false, { message: 'Incorrect password.' })
    //               : done(null, false, { message: 'Incorrect username.' });
    //         });
    //       }), {
    //         successRedirect: '/',
    //         failureRedirect: '/login'
    //         // failureFlash: true
    //     })(req, res, next)
    // }
    // catch(e){
    //     res.status(500).json({
    //         message: 'Something went wrong, try again: ' + e.message
    //     });
    // }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    await User
        .findOne({ where: { id: req.user.id }, raw: true })
        .then((user) => {
            res.json(user)
        }
        )



    // const email = req.body.email;
    // const password = req.body.password;

    // if (!email || !password) {
    //     res.render('login', {
    //         title: 'Fill the all fields!'
    //     });
    // }
    // else {
    //     User
    //         .findAll({ where: { email: email, password: password }, raw: true })
    //         .then((user) => {
    //             res.redirect("http://localhost:5000")
    //             console.log('user: ' + user)
    //         }
    //         );
    // }
    try {

    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        });
    }
}