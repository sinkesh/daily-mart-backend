module.exports = (sequelize, Sequelize) => {
    const FinalDiscountAmountTables = sequelize.define("final_discount_amount", {
        discount_amount_id: {
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
        coupon_id: {
            type: Sequelize.INTEGER
        },
        coupon_discount: {
            type: Sequelize.INTEGER
        },
        coupon_code: {
            type: Sequelize.STRING
        },
        is_coupon_apply: {
            type: Sequelize.BOOLEAN(true, false),
            defaultValue: false
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "Blocked"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return FinalDiscountAmountTables;
};