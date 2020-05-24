const db = require('../models');
const Guitar_Body_Type = db.guitar_body_types;
const Guitar_Type = db.guitar_types;

module.exports = (sequelize, Sequelize) => {
    const Guitar_Body_Type = sequelize.define("guitar_body_type", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_guitar_type: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Guitar_Type,
            referencesKey: 'id',
            field: 'id_guitar_type'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'title'
        }
    },{
        modelName: 'Guitar_Body_Type',
        tableName: 'guitar_body_type',
        timestamps: false
    });
    
    return Guitar_Body_Type;
}