module.exports = (sequelize, Sequelize) => {
    const BannerTables = sequelize.define("banner_master", {
        banner_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        banner_name: {
            type: Sequelize.STRING
        },
        banner_image: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return BannerTables;
};