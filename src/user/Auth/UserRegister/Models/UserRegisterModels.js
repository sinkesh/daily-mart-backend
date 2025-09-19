module.exports = (sequelize, Sequelize) => {
    const UserRegisterTables = sequelize.define("user_register", {
        user_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        user_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        is_email_verified: {
            type: Sequelize.BOOLEAN
        },
        password: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        is_phone_verified: {
            type: Sequelize.BOOLEAN
        },
        role: {
            type: Sequelize.ENUM("Admin", "User", "Vendor")
        },
        gender: {
            type: Sequelize.ENUM("Male", "Female", "Other")
        },
        date_of_birth: {
            type: Sequelize.STRING
        },
        profile_image: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        pincode: {
            type: Sequelize.STRING
        },
        last_login: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE", "Blocked"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return UserRegisterTables;
};