module.exports = (sequelize, Sequelize) => {
    const ProductTables = sequelize.define("product", {
        product_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: Sequelize.STRING
        },
        product_slug: {
            type: Sequelize.STRING
        },
        product_description: {
            type: Sequelize.TEXT
        },
        short_description: {
            type: Sequelize.STRING
        },
        brand_id: {
            type: Sequelize.INTEGER
        },
        brand_name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        category_name: {
            type: Sequelize.STRING
        },
        sku: {
            type: Sequelize.STRING
        },
        hsn_code: {
            type: Sequelize.STRING
        },
        unit_price: {
            type: Sequelize.STRING
        },
        unit_price: {
            type: Sequelize.FLOAT
        },
        discount_price: {
            type: Sequelize.FLOAT
        },
        currency: {
            type: Sequelize.STRING
        },
        tax_rate: {
            type: Sequelize.FLOAT
        },
        stock_quantity: {
            type: Sequelize.INTEGER
        },
        reorder_level: {
            type: Sequelize.STRING
        },
        warehouse_location: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.FLOAT
        },
        dimensions: {
            type: Sequelize.JSON
        },
        color: {
            type: Sequelize.STRING
        },
        size: {
            type: Sequelize.STRING
        },
        material: {
            type: Sequelize.STRING
        },
        tags: {
            type: Sequelize.JSON
        },
        thumbnail_image: {
            type: Sequelize.STRING
        },
        video_url: {
            type: Sequelize.STRING
        },
        is_featured: {
            type: Sequelize.BOOLEAN
        },
        created_by: {
            type: Sequelize.INTEGER
        },
        updated_by: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        },
    }, {
        freezeTableName: true
    });
    return ProductTables;
};