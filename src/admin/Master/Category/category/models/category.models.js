module.exports = (sequelize, Sequelize) => {
    const CategoryTables = sequelize.define("category_master", {
        category_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category_name: {
            type: Sequelize.STRING
        },
        category_code: {
            type: Sequelize.STRING
        },
        category_image: {
            type: Sequelize.STRING
        },
        category_description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return CategoryTables;
};