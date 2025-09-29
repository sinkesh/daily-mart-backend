module.exports = (sequelize, Sequelize) => {
    const ProductViewTables = sequelize.define("product_view", {
        product_view_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        product_id: {
            type: Sequelize.INTEGER,
        },
        product_name: {
            type: Sequelize.STRING
        },
        product_view_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        add_to_cart_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        add_to_wishlish_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        checkout_started_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        checkout_address_details_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        checkout_completed_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        payment_completed_count: {
            type: Sequelize.INTEGER,
            default: 0
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return ProductViewTables;
};