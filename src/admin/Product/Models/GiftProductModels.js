module.exports = (sequelize, Sequelize) => {
    const GiftProductTables = sequelize.define("gift_product", {
        gift_product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
        product_name: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER,
            default: 1
        },
        offer_price: {
            type: Sequelize.INTEGER,
            default: 0
        },
        gift_item: {
            type: Sequelize.JSON
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return GiftProductTables;
};