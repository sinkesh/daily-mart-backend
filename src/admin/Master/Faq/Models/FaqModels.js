module.exports = (sequelize, Sequelize) => {
    const FaqTables = sequelize.define("faq_master", {
        faq_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        question: {
            type: Sequelize.STRING
        },
        answer: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return FaqTables;
};