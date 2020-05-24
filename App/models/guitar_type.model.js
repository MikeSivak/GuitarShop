module.exports = (sequelize, Sequelize) => {
    const Guitar_Type = sequelize.define("guitar_type", {
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
        modelName: 'Guitar_Type',
        tableName: 'guitar_type',
        timestamps: false
    });
    
    return Guitar_Type;
}