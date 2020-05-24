const db = require('../models');
const Role = db.roles;

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_role: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Role,
            referencesKey: 'id',
            field: 'id_role'
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'first_name'
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'last_name'
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'phone'
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'email'
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'password'
        }
    },{
        modelName: 'User',
        tableName: 'users',
        timestamps: false
    });

    return User;
}
