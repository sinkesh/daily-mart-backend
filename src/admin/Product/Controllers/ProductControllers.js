const db = require("../../../models_routes/index");
const productDetails = db.ProductModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create Product ///////////////

exports.Create_Product = async (req, res) => {
    try {
        const { product_name, product_slug, product_description, short_description, brand_id, brand_name, category_id, category_name, product_sku, uom, hsn_code,
            unit_price, offer_price, discount_price, currency, tax_rate, stock_quantity, reorder_level, warehouse_location, weight, dimensions, color, size, material,
            tags, is_featured, created_by, updated_by } = req.body;

        let thumbnailImage = req.files?.thumbnail_image?.[0]?.path || "";
        let videoUrl = req.files?.video_url?.[0]?.path || "";

        let filePath = thumbnailImage ? thumbnailImage.split(path.sep).join('/').replace(/^public\//, '') : '';
        let filePath2 = videoUrl ? videoUrl.split(path.sep).join('/').replace(/^public\//, '') : '';

        const getProductData = await productDetails.findOne({ where: { product_name: product_name } });
        if (getProductData) {
            return res.status(403).send({ code: 403, message: "Product Name Already Exists " })
        }

        const response = await productDetails.create({
            product_name,
            product_slug,
            product_description,
            short_description,
            brand_name,
            category_name,
            product_sku,
            uom,
            hsn_code,
            unit_price,
            offer_price,
            discount_price,
            currency,
            tax_rate,
            stock_quantity,
            reorder_level,
            warehouse_location,
            weight,
            dimensions,
            color,
            size,
            material,
            tags,
            thumbnail_image: filePath ? baseUrl + filePath : '',
            video_url: filePath2 ? baseUrl + filePath2 : '',
            is_featured,
            created_by,
            updated_by
        });
        return res.status(200).send({ code: 200, message: "Product Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Edit Product ///////////////

exports.Edit_Product = async (req, res) => {
    try {
        const productId = req.params.id;
        const { product_name, product_slug, product_description, short_description, brand_id, brand_name, category_id, category_name, product_sku, uom, hsn_code,
            unit_price, offer_price, discount_price, currency, tax_rate, stock_quantity, reorder_level, warehouse_location, weight, dimensions, color, size, material,
            tags, is_featured, created_by, updated_by } = req.body;

        const editData = await productDetails.findOne({ where: { product_id: productId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

        let thumbnailImage = req.files?.thumbnail_image?.[0]?.path || "";
        let videoUrl = req.files?.video_url?.[0]?.path || "";

        let filePath = thumbnailImage ? thumbnailImage.split(path.sep).join('/').replace(/^public\//, '') : '';
        let filePath2 = videoUrl ? videoUrl.split(path.sep).join('/').replace(/^public\//, '') : '';

        // const alreadyExist = await productDetails.findOne({ where: { product_name: product_name } });
        // if (alreadyExist) {
        //     return res.status(400).send({ code: 400, message: "Product Already Exists" });
        // }

        await productDetails.update({
            product_name,
            product_slug,
            product_description,
            short_description,
            brand_name,
            category_name,
            product_sku,
            uom,
            hsn_code,
            unit_price,
            offer_price,
            discount_price,
            currency,
            tax_rate,
            stock_quantity,
            reorder_level,
            warehouse_location,
            weight,
            dimensions,
            color,
            size,
            material,
            tags,
            thumbnail_image: filePath ? baseUrl + filePath : '',
            video_url: filePath2 ? baseUrl + filePath2 : '',
            is_featured,
            created_by,
            updated_by
        }, { where: { product_id: productId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Product Status ///////////////

exports.Update_Product_Status = async (req, res) => {
    try {
        const productId = req.params.id;
        const { status } = req.body;
        const editData = await productDetails.findOne({ where: { product_id: productId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await productDetails.update({ status }, { where: { product_id: productId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Product ///////////////

exports.Get_All_Active_Product = async (req, res) => {
    try {
        const getAllData = await productDetails.findAll({ where: { status: "ACTIVE" }, order: [['product_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Product Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Product ///////////////

exports.Get_All_Product = async (req, res) => {
    try {
        const getAllData = await productDetails.findAll({ order: [['product_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Product Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Product ///////////////

exports.Get_ById_Product = async (req, res) => {
    try {
        const productId = req.params.id;
        const getData = await productDetails.findOne({ where: { product_id: productId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Delete Product ///////////////

exports.Delete_Product = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await productDetails.findOne({ where: { product_id: productId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Product not found!" });
        }
        await productDetails.update({ status }, { where: { product_id: productId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};

