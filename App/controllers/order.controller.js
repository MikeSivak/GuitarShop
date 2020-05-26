const db = require('../models');

const Order = db.orders;
const User = db.users;
const Guitar = db.guitars;
const Manufacturer = db.manufacturers;
const Op = db.Sequelize.Op;

User.hasMany(Order, {
    foreignKey: 'id_user',
    sourceKey: 'id'
});
Order.belongsTo(User, {
    foreignKey: 'id_user'
});

Guitar.hasMany(Order, {
    foreignKey: 'id_guitar',
    sourceKey: 'id'
});
Order.belongsTo(Guitar, {
    foreignKey: 'id_guitar'
});

Manufacturer.hasMany(Guitar, {
    foreignKey: 'id_manufacturer',
    sourceKey: 'id'
});
Guitar.belongsTo(Manufacturer, {
    foreignKey: 'id_manufacturer'
});

exports.getOrdersList = async (req,res)=>{

    try {
        await Order
            .findAll({
                include: [
                    { model: User},
                    { model: Guitar, include: Manufacturer}
                ],
                raw: true
            }
            ).then(orders => {
                res.render('order.view.hbs', {
                    title: 'Or',
                    orders: orders,
                    // manufacturers: manufacturers
                });
                console.log(orders);
                // console.log(manufacturers);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.saleGuitar = (req,res)=>{
    let id = req.body.id;
    try{
        Order
            .destroy(
            {
                where:{
                    id:id
                }
            })
            .then(
                res.redirect("http://localhost:5000/orders")
            );
    }
    catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}