module.exports = (sequelize, Sequelize) => {
    const WishListTables = sequelize.define("wishlist", {
        favorite_id: {
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
        user_name: {
            type: Sequelize.STRING
        },
        favorite: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        is_gift: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return WishListTables;
};