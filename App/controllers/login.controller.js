const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.loginUsers = (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password || !fname || !lname || !phone) {
        res.render('registration', {
            title: 'Fill the all fields!'
        });
    }
    else{
        User
        .findAll({where:{email:email,password:password}, raw: true })
        .then(
            res.redirect("home"),
        );
    }
    try{
        
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        });
    }
}