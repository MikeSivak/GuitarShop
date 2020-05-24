const db = require('../models');

const Guitar = db.guitars;
const Country = db.countries;
const Guitar_Body_Type = db.guitar_body_types;
const Guitar_Type = db.guitar_types;
const Manufacturer = db.manufacturers;
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

exports.getContent = async (req, res) => {
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
                });
                console.log(content);
            })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}