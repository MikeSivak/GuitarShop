const db = require('../models');

const User = db.users;
const Role = db.roles;
const Op = db.Sequelize.Op;
 
Role.hasOne(User, {
    foreignKey:'id_role',
    sourceKey: 'id'
});
User.belongsTo(Role,{
    foreignKey:'id_role'
});

exports.getUsers = (req,res)=>{
    try{
        User
            .findAll({raw:true, include:Role}).then(users=>{
                res.render('users.view.hbs', {
                    title: 'Users',
                    users: users
                });
                console.log(users);
            })
    } catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.saveUsers = (req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let phone = req.body.phone;
    let email = req.body.email;
    let id = req.body.id;
    try{
        User
            .update({
                first_name:fname,
                last_name:lname,
                phone:phone,
                email:email
            },
            {
                where:{
                    id:id
                }
            })
            .then(
                res.redirect("http://localhost:5000/users")
            );
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteUsers = (req,res)=>{
    let id = req.body.id;
    try{
        User
            .destroy(
            {
                where:{
                    id:id
                }
            })
            .then(
                res.redirect("http://localhost:5000/users")
            );
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}