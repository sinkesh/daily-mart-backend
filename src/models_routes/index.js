
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

db.CategoryModels = require("../admin/Master/Category/category/models/category.models")(sequelize, Sequelize);
db.SubCategoryModels = require("../admin/Master/Category/subCategory/models/subCategory.models")(sequelize, Sequelize);
db.StockModels = require("../admin/Master/Stock/Models/StockModels")(sequelize, Sequelize);
db.BrandModels = require("../admin/Master/Brand/Models/BrandModels")(sequelize, Sequelize);
db.ProductModels = require("../admin/Product/Models/ProductModels")(sequelize, Sequelize);
db.UserModels = require("../user/Auth/UserRegister/Models/UserRegisterModels")(sequelize, Sequelize);
db.FaqModels = require("../admin/Master/Faq/Models/FaqModels")(sequelize, Sequelize);
db.BannerModels = require("../admin/Master/Banner/Models/BannerModels")(sequelize, Sequelize);

module.exports = db;