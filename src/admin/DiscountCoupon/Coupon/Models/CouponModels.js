module.exports = (sequelize, Sequelize) => {
    const CouponTables = sequelize.define("coupon", {
        coupon_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        coupon_name: {
            type: Sequelize.STRING
        },
        coupon_type: {
            type: Sequelize.STRING
        },
        purchase_value_min: {
            type: Sequelize.STRING
        },
        purchase_value_max: {
            type: Sequelize.STRING
        },
        max_ordervalue: {
            type: Sequelize.STRING
        },
        discount_value: {
            type: Sequelize.STRING
        },
        valid_between: {
            type: Sequelize.STRING
        },
        re_usable: {
            type: Sequelize.STRING
        },
        coupon_code: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        from_date: {
            type: Sequelize.STRING
        },
        to_date: {
            type: Sequelize.STRING
        },
        discount_type: {
            type: Sequelize.STRING
        },
        max_discount_amount: {
            type: Sequelize.FLOAT
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "Blocked"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return CouponTables;
};