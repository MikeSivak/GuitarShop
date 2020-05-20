const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.loginUsers = (req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    console.log('email: ' + email + ' -- password: ' + password);
    try{
        User
        .findAll({where:{email:email,password:password}, raw: true })
        .then(users=>{
            res.redirect("http://localhost:5000"),
            console.log('User: ' + users)
        }
        );
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        });
    }
}