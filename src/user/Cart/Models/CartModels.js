module.exports = (sequelize, Sequelize) => {
    const CartTables = sequelize.define("cart", {
        cart_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        quantity: {
            type: Sequelize.STRING
        },
        is_gift: {
            type: Sequelize.BOOLEAN(true, false),
            default: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "Blocked"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return CartTables;
};