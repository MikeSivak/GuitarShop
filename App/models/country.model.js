module.exports = (sequelize, Sequelize) => {
    const Country = sequelize.define("country", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'title'
        }
    },{
        modelName: 'Country',
        tableName: 'countries',
        timestamps: false
    });
    
    return Country;
}