const db = require('../models');

const Guitar = db.guitars;
const Country = db.countries;
const Guitar_Body_Type = db.guitar_body_types;
const Guitar_Type = db.guitar_types;
const Manufacturer = db.manufacturers;
const Op = db.Sequelize.Op;

Country.hasOne(Manufacturer, {
    foreignKey:'id_country',
    sourceKey: 'id'
});
Manufacturer.belongsTo(Country,{
    foreignKey:'id_country',
});

Guitar_Type.hasOne(Guitar_Body_Type, {
    foreignKey:'id_guitar_type',
    sourceKey: 'id'
});
Guitar_Body_Type.belongsTo(Guitar_Type,{
    foreignKey:'id_guitar_type'
});

Manufacturer.hasMany(Guitar,{
        foreignKey: 'id_manufacturer',
        sourceKey: 'id'
    });
Guitar.belongsTo(Manufacturer,{
    foreignKey:'id_manufacturer'
});

Guitar_Body_Type.hasOne(Guitar, {
    foreignKey: 'id_body_type',
    sourceKey: 'id'
});
Guitar.belongsTo(Guitar_Body_Type,{
    foreignKey:'id_body_type'
}, {onDelete:'cascade', onUpdate:'cascade'});

exports.getGuitars = (req,res)=>{
    try{
        Guitar
            .findAll({
                include:[ 
                    {model: Guitar_Body_Type, include:Guitar_Type},
                    {model: Manufacturer, include:Country}
                ],
                raw: true
            }
                ).then(guitars=>{
                res.render('guitar.view.hbs', {
                    title: 'Guitars',
                    guitars: guitars,
                });
                console.log(guitars);
            })
    } catch(e){
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.addGuitar = async (req, res) => {
    let manuf = req.body.manuf;
    let model = req.body.model;
    let gbody_type = req.body.gbody;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let descript = req.body.descript;
    let load_pic = req.body.load_pic;

    const manufacturer = await Manufacturer
        .findOne({ where: { title: manuf }, raw: true })
    id_manuf = manufacturer.id;

    const gBodyType = await Guitar_Body_Type
        .findOne({ where: { title: gbody_type }, raw: true })
    id_gbody = gBodyType.id;
    
    try {
        Guitar
            .create({
                model: model,
                price: price,
                quantity: quantity,
                id_manufacturer: id_manuf,
                id_body_type: id_gbody,
                descript: descript,
                picture_path: load_pic
            })
            .then(
                res.redirect("http://localhost:5000/guitars")
            );
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        });
    }
}

exports.saveGuitars = async (req, res) => {
    let manuf = req.body.manuf;
    let model = req.body.model;
    let gbody_type = req.body.gbody_type;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let id = req.body.id;
    let descript = req.body.descript;
    let load_pic = req.body.load_pic;

    console.log('descript: ' + descript);
    console.log('load_pic: ' + load_pic);

    let id_manuf = "";
    let id_gbody_type = "";

    const manufacturer = await Manufacturer
        .findOne({ where: { title: manuf }, raw: true })
    id_manuf = manufacturer.id;

    const gBodyType = await Guitar_Body_Type
        .findOne({ where: { title: gbody_type }, raw: true })
    id_gbody_type = gBodyType.id;
    try {
        await Guitar
            .update({
                model: model,
                price: price,
                quantity: quantity,
                id_manufacturer: id_manuf,
                id_body_type: id_gbody_type,
                descript: descript,
                picture_path: load_pic
            },
                {
                    where: {
                        id: id
                    }
                })
            .then(
                res.redirect("http://localhost:5000/guitars")
            );
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}

exports.deleteGuitars = (req, res) => {
    let id = req.body.id;
    try {
        Guitar
            .destroy(
                {
                    where: {
                        id: id
                    }
                })
            .then(
                res.redirect("http://localhost:5000/guitars")
            );
    }
    catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again: ' + e.message
        })
    }
}