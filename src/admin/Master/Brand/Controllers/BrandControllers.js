const db = require("../../../../models_routes/index");
const BrandDetails = db.BrandModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create Brand ///////////////

exports.Create_Brand = async (req, res) => {
    try {
        const { brand_name, description } = req.body;
        let brandImage = req.files?.brand_logo?.[0]?.path || "";
        let filePath = brandImage ? brandImage.split(path.sep).join('/').replace(/^public\//, '') : '';
        const response = await BrandDetails.create({
            brand_name,
            description,
            brand_logo: filePath ? baseUrl + filePath : ''
        });
        return res.status(200).send({ code: 200, message: "Sub-Category Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Edit Brand ///////////////

exports.Edit_Brand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const { brand_name, description } = req.body;
        const editData = await BrandDetails.findOne({ where: { brand_id: brandId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        let brandImage = req.files?.brand_logo?.[0]?.path || "";
        let filePath = brandImage ? brandImage.split(path.sep).join('/').replace(/^public\//, '') : '';

        await BrandDetails.update({
            brand_name,
            description,
            brand_logo: filePath ? baseUrl + filePath : ''
        }, { where: { brand_id: brandId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Brand Status ///////////////

exports.Update_Brand_Status = async (req, res) => {
    try {
        const brandId = req.params.id;
        const { status } = req.body;
        const editData = await BrandDetails.findOne({ where: { brand_id: brandId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await BrandDetails.update({ status }, { where: { brand_id: brandId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Brand ///////////////

exports.Get_All_Active_Brand = async (req, res) => {
    try {
        const getAllData = await BrandDetails.findAll({ where: { status: "ACTIVE" }, order: [['brand_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Brand Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Brand ///////////////

exports.Get_All_Brand = async (req, res) => {
    try {
        const getAllData = await BrandDetails.findAll({ where: { order: [['brand_id', 'DESC']] } })
        return res.status(200).send({ code: 200, message: "Fetch All Brand Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Brand ///////////////

exports.Get_ById_Brand = async (req, res) => {
    try {
        const brandId = req.params.id;
        const getData = await BrandDetails.findOne({ where: { brand_id: brandId } });
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

/////////////// Delete Brand ///////////////

exports.Delete_Brand = async (req, res) => {
    try {
        const brandId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await BrandDetails.findOne({ where: { brand_id: brandId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Brand not found!" });
        }
        await BrandDetails.update({ status }, { where: { brand_id: brandId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};

