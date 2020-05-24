const db = require('../models');
const Manufacturer = db.manufacturers;
const Guitar_Body_Type = db.guitar_body_types;
// const Guitar_Type = db.guitars_types;

module.exports = (sequelize, Sequelize) => {
    const Guitar = sequelize.define("guitar", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        model: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'model'
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'price'
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'quantity'
        },
        id_manufacturer: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Manufacturer,
            referencesKey: 'id',
            field: 'id_manufacturer'
        },
        id_body_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Guitar_Body_Type,
            referencesKey: 'id',
            field: 'id_body_type'
        }
    },{
        modelName: 'Guitar',
        tableName: 'guitars',
        timestamps: false
    });

    return Guitar;
}
