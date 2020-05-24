const db = require('../models');
const Country = db.countries;

module.exports = (sequelize, Sequelize) => {
    const Manufacturer = sequelize.define("manufacturer", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_country: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Country,
            referencesKey: 'id',
            field: 'id_country'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'title'
        }
    },{
        modelName: 'Manufacturer',
        tableName: 'manufacturers',
        timestamps: false
    });
    
    return Manufacturer;
}