const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs');

exports.registrateUsers = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const phone = req.body.phone;

    // if(email)
    // req.checkBody('lname', 'Name is required.').notEmpty();
    // req.checkBody('email', 'Email is required.').notEmpty();
    // req.checkBody('email', 'Email is not valid.').isEmail();
    // req.checkBody('fname', 'Username is required.').notEmpty();
    // req.checkBody('password', 'Password is required.').notEmpty();
    // req.checkBody('phone', 'Password is required.').notEmpty();
    // req.checkBody('password', 'Passwords do not match.').equals(req.body.password);

    // let errors = req.validationErrors();
    if (!email || !password || !fname || !lname || !phone) {
        res.render('registration', {
            title: 'Fill the all fields!'
        });
    } else {
        let newUser = new User({
            id_role: 2,
            email: email,
            password: password,
            first_name: fname,
            last_name: lname,
            phone: phone
        });
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                }

                newUser.password = hash;

                ////////////////
                User
                    .create({
                        id_role: 2,
                        email: newUser.email,
                        password: newUser.password,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        phone: newUser.phone
                    })
                    .then(
                        // req.flash('success', 'You are now registered and can log in.'),
                        res.redirect("/login")
                    );
            });
        });
    }

    ///////////////////
    // try{
    //     User
    //     .create({
    //         id_role:2,
    //         email:email,
    //         password:password,
    //         first_name:fname,
    //         last_name:lname,
    //         phone:phone
    //     })
    //     .then(
    //         res.redirect("http://localhost:5000")
    //     );
    // }
    // catch(e){
    //     res.status(500).json({
    //         message: 'Something went wrong, try again: ' + e.message
    //     });
    // }
}