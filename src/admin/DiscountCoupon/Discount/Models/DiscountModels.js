module.exports = (sequelize, Sequelize) => {
    const DiscountCouponTables = sequelize.define("discount_coupon", {
        discount_coupon_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: Sequelize.INTEGER
        },
        sub_category_id: {
            type: Sequelize.INTEGER
        },
        product_name: {
            type: Sequelize.STRING
        },
        sub_category_name: {
            type: Sequelize.STRING,
        },
        sub_category_image: {
            type: Sequelize.STRING,
        },
        sub_category_banner: {
            type: Sequelize.STRING,
        },
        sub_category_description: {
            type: Sequelize.STRING,
        },
        discount_name: {
            type: Sequelize.STRING,
        },
        coupon_code: {
            type: Sequelize.STRING,
        },
        discount_type: {
            type: Sequelize.STRING,
        },
        discount_value: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.STRING,
        },
        offer_price: {
            type: Sequelize.STRING,
        },
        discount_offer_price: {
            type: Sequelize.STRING,
        },
        discount_value_type: {
            type: Sequelize.STRING,
        },
        product_value_min: {
            type: Sequelize.STRING,
        },
        re_usable: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        from_date: {
            type: Sequelize.STRING,
        },
        to_date: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "Blocked"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return DiscountCouponTables;
};