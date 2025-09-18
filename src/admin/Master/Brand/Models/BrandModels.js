module.exports = (sequelize, Sequelize) => {
    const BrandTables = sequelize.define("brand_master", {
        brand_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand_name: {
            type: Sequelize.STRING
        },
        brand_logo: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return BrandTables;
};