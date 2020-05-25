const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.registrateUsers = (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    
    try{
        User
        .create({
            id_role:2,
            email:email,
            password:password,
            first_name:fname,
            last_name:lname,
            phone:phone
        })
        .then(
            res.redirect("http://localhost:5000")
        );
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        });
    }
}