const db = require("../../../../models_routes/index");
const productDetails = db.ProductModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create Sub Category ///////////////

exports.Create_Product = async (req, res) => {
    try {
        const { product_name, product_slug, product_description, short_description, brand_id, brand_name, category_id, category_name, sku, hsn_code, 
            unit_price, discount_price, currency, tax_rate, stock_quantity, reorder_level, warehouse_location, weight, dimensions, color, size, material, 
            tags, images, thumbnail_image, video_url, is_featured, created_by, updated_by } = req.body;

        const response = await productDetails.create({
            product_name,
            product_slug,
            product_description,
            short_description,
            brand_id,
            brand_name,
            category_id,
            category_name,
            sku,
            hsn_code,
            unit_price,
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
            images,
            thumbnail_image,
            video_url,
            is_featured,
            created_by,
            updated_by
        });
        return res.status(200).send({ code: 200, message: "Sub-Category Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Edit Sub Category ///////////////

exports.Edit_Product = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const { category_id, sub_category_name, category_name, sub_category_description, is_popular_subcategory } = req.body;
        const editData = await productDetails.findOne({ where: { sub_category_id: subCategoryId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        let subCategoryImage = req.files?.sub_category_image?.[0]?.path || "";
        let bannerImage = req.files?.sub_category_banner?.[0]?.path || "";
        let filePath = subCategoryImage ? subCategoryImage.split(path.sep).join('/').replace(/^public\//, '') : '';
        let filePath2 = bannerImage ? bannerImage.split(path.sep).join('/').replace(/^public\//, '') : '';
        const alreadyExist = await productDetails.findOne({ where: { sub_category_name: sub_category_name } });
        if (alreadyExist && alreadyExist.category_id != subCategoryId) {
            return res.status(400).send({ code: 400, message: "Sub Category Already Exists" });
        }
        await productDetails.update({
            category_id,
            sub_category_name,
            category_name,
            sub_category_description,
            is_popular_subcategory,
            sub_category_image: filePath ? baseUrl + filePath : '',
            sub_category_banner: filePath2 ? baseUrl + filePath2 : ''
        }, { where: { sub_category_id: subCategoryId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Sub Category Status ///////////////

exports.Update_Product_Status = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const { status } = req.body;
        const editData = await productDetails.findOne({ where: { sub_category_id: subCategoryId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await productDetails.update({ status }, { where: { sub_category_id: subCategoryId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Sub Category ///////////////

exports.Get_All_Active_Product = async (req, res) => {
    try {
        const getAllData = await productDetails.findAll({ where: { status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Sub Category Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Sub Category ///////////////

exports.Get_All_Product = async (req, res) => {
    try {
        const getAllData = await productDetails.findAll()
        return res.status(200).send({ code: 200, message: "Fetch All Sub Category Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Sub Category ///////////////

exports.Get_ById_Product = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        const getData = await productDetails.findOne({ where: { sub_category_id: subCategoryId } });
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

/////////////// Delete Sub Category ///////////////

exports.Delete_Product = async (req, res) => {
    try {
        const subCategoryId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await productDetails.findOne({ where: { sub_category_id: subCategoryId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Sub Category not found!" });
        }
        await productDetails.update({ status }, { where: { sub_category_id: subCategoryId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};

