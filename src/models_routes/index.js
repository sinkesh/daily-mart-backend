
const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB_NAME,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.CategoryModels = require("../admin/Category/category/models/category.models")(sequelize, Sequelize);
db.SubCategoryModels = require("../admin/Category/subCategory/models/subCategory.models")(sequelize, Sequelize);

module.exports = db;