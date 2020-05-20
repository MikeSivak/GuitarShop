module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
            field: 'id'
        },
        role_name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'role_name'
        }
    },{
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false
    });
    
    return Role;
}





// function internalORM(sequelize){
//     Roles.init({
//         id: {
//             type: Sequelize.INTEGER,
//             autoIncrement: true,
//             primaryKey: true,
//             allowNull: false,
//             field: 'id'
//         },
//         role_name: {
//             type: Sequelize.STRING,
//             allowNull: false,
//             field: 'role_name'
//         }
//     }, {
//         sequelize,
//         modelName: 'Roles',
//         tableName: 'roles',
//         timestamps: false
//     });
//     sequelize.sync().then(result=>console.log(result))
//     .catch(err=> console.log(err));
// }

// exports.ORM = (s) => {
//     internalORM(s);
//     return{
//         Roles
//     }
// };
