const db = require('../models');
const Order = db.orders;
const Guitar = db.guitars;
const User = db.users;

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        id_user: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: User,
            referencesKey: 'id',
            field: 'id_user'
        },
        id_guitar: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: Guitar,
            referencesKey: 'id',
            field: 'id_guitar'
        },
        order_date: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'order_date'
        }
    },{
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false
    });

    return Order;
}
