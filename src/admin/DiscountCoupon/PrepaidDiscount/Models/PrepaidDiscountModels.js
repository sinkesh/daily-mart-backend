module.exports = (sequelize, Sequelize) => {
    const PrepaidDiscountTables = sequelize.define("prepaid_discount", {
        prepaid_discount_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        },
        prepaid_discount: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "BLOCKED"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return PrepaidDiscountTables;
};