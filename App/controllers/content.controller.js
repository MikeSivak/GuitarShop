const db = require('../models');
const Sequelize = require('sequelize');
const Guitar = db.guitars;
const Country = db.countries;
const Guitar_Body_Type = db.guitar_body_types;
const Guitar_Type = db.guitar_types;
const Manufacturer = db.manufacturers;
const Order = db.orders;
const User = db.users;
const Op = db.Sequelize.Op;

Country.hasOne(Manufacturer, {
    foreignKey: 'id_country',
    sourceKey: 'id'
});
Manufacturer.belongsTo(Country, {
    foreignKey: 'id_country',
});

Guitar_Type.hasOne(Guitar_Body_Type, {
    foreignKey: 'id_guitar_type',
    sourceKey: 'id'
});
Guitar_Body_Type.belongsTo(Guitar_Type, {
    foreignKey: 'id_guitar_type'
});

Manufacturer.hasMany(Guitar, {
    foreignKey: 'id_manufacturer',
    sourceKey: 'id'
});
Guitar.belongsTo(Manufacturer, {
    foreignKey: 'id_manufacturer'
});

Guitar_Body_Type.hasOne(Guitar, {
    foreignKey: 'id_body_type',
    sourceKey: 'id'
});
Guitar.belongsTo(Guitar_Body_Type, {
    foreignKey: 'id_body_type'
});

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

exports.buyGuitar = async (req, res) => {

    // console.log('guitar id: ' + req.body.id);
    // console.log('User id: ' + req.user.id);
    // console.log('User id_role: ' + req.user.id_role);
    const id_guitar = req.body.id;
    const id_user = req.user.id;
    const date = new Date();

    try {
        await Order
            .create({
                id_user: id_user,
                id_guitar: id_guitar,
                order_date: date
            })
            .then(
                // res.json('GUITAR BOUGHT =)')
                res.render('buySuccess.view.hbs')
            );
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getContent = async (req, res) => {

    const manufacturers = await Manufacturer
        .findAll({ raw: true });

    try {
        await Guitar
            .findAll({
                include: [
                    { model: Guitar_Body_Type, include: Guitar_Type },
                    { model: Manufacturer, include: Country }
                ],
                raw: true
            }
            ).then(content => {
                res.render('content.view.hbs', {
                    title: 'Guitars',
                    content: content,
                    manufacturers: manufacturers
                });
                console.log(content);
                console.log(manufacturers);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getGuitarsByCondition = async (req, res) => {

    console.log('get value checkbox: ' + req.body.Martin);
    console.log('get value radio button: ' + req.body.price_interval);
    // console.log('get value radio: ' + req.body.price_interval_1);

    const price_interval = req.body.price_interval || 100000;

    const manufacturers = await Manufacturer
        .findAll({ raw: true });

    const checked_manuf = manufacturers.filter(m => {
        return req.body[m.title] !== undefined;
    })
    console.log("eeeeeeeeeeeeee:" + checked_manuf.map(el => el.id));

    try {
        await Guitar
            .findAll({
                where: {
                    id_manufacturer: {
                        [Op.or]: checked_manuf.map(el => el.id),
                    },
                    price: {
                        [Op.lt]: price_interval
                    }
                },
                include: [
                    { model: Guitar_Body_Type, include: Guitar_Type },
                    { model: Manufacturer, include: Country }
                ],
                raw: true
            }
            )
            .then(content => {
                res.render('content.view.hbs', {
                    title: 'Guitars',
                    content: content,
                    manufacturers: manufacturers
                });
                console.log("Content: " + content);
                console.log(manufacturers);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.getDescription = async (req, res) => {
    try {
        await Guitar
            .findAll({
                where: { id: req.params.id },
                include: [
                    { model: Guitar_Body_Type, include: Guitar_Type },
                    { model: Manufacturer, include: Country }
                ],
                raw: true
            }
            ).then(content => {
                res.render('guitarDescript.view.hbs', {
                    title: 'Guitars',
                    content: content,
                });
                console.log(content);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}