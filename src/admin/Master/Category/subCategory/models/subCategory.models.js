module.exports = (sequelize, Sequelize) => {
    const SubCategoryTables = sequelize.define("sub_category_master", {
        sub_category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        sub_category_name: {
            type: Sequelize.STRING
        },
        sub_category_code: {
            type: Sequelize.STRING
        },
        category_name: {
            type: Sequelize.STRING
        },
        sub_category_image: {
            type: Sequelize.STRING
        },
        sub_category_description: {
            type: Sequelize.STRING
        },
        sub_category_banner: {
            type: Sequelize.STRING
        },
        is_popular_subcategory: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return SubCategoryTables;
};