module.exports = (sequelize, Sequelize) => {
    const StockTables = sequelize.define("stock_master", {
        stock_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        product_name: {
            type: Sequelize.STRING
        },
        brand_id: {
            type: Sequelize.INTEGER
        },
        brand_name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        category_name: {
            type: Sequelize.STRING
        },
        stock_quantity: {
            type: Sequelize.INTEGER
        },
        reorder_level: {
            type: Sequelize.STRING
        },
        unit_price: {
            type: Sequelize.STRING
        },
        warehouse_location: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return StockTables;
};