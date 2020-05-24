const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.guitars = require("./guitar.model")(sequelize, Sequelize);
db.countries = require("./country.model")(sequelize,Sequelize);
db.manufacturers = require("./manufacturer.model")(sequelize,Sequelize);
db.guitar_body_types = require("./guitar_body_type.model")(sequelize,Sequelize);
db.guitar_types = require("./guitar_type.model")(sequelize,Sequelize);

module.exports = db;