const db = require("../../../../models_routes/index");
const bannerDetails = db.BannerModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create Banner ///////////////

exports.Create_Banner = async (req, res) => {
    try {
        const { banner_name } = req.body;
        const bannerImage = req.file;
        let filePath = bannerImage.path.split(path.sep).join('/');
        filePath = filePath.replace(/^public\//, '');
        const getData = await bannerDetails.findOne({ where: { banner_name: banner_name } })
        if (getData) {
            return res.status(400).send({ code: 400, message: "Banner Already Exits!" })
        } else {
            const response = await bannerDetails.create({
                banner_name,
                banner_image: baseUrl + filePath
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Edit Banner ///////////////

exports.Edit_Banner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const { banner_name } = req.body;

        const editData = await bannerDetails.findOne({ where: { banner_id: bannerId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

        const alreadyExist = await bannerDetails.findOne({ where: { banner_name } });
        if (alreadyExist && alreadyExist.banner_id != bannerId) {
            return res.status(400).send({ code: 400, message: "Banner Already Exists" });
        }

        let updatedData = { banner_name };

        if (req.file) {
            let filePath = req.file.path.split(path.sep).join('/');
            filePath = filePath.replace(/^public\//, '');
            updatedData.banner_image = baseUrl + filePath;
        }

        const updateData = await bannerDetails.update(updatedData, { where: { banner_id: bannerId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Banner Status ///////////////

exports.Update_Banner_Status = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const { status } = req.body;
        const editData = await bannerDetails.findOne({ where: { banner_id: bannerId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await bannerDetails.update({ status }, { where: { banner_id: bannerId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Banner ///////////////

exports.Get_All_Active_Banner = async (req, res) => {
    try {
        const getAllData = await bannerDetails.findAll({ where: { status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Banner Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Banner ///////////////

exports.Get_All_Banner = async (req, res) => {
    try {
        const getAllData = await bannerDetails.findAll()
        return res.status(200).send({ code: 200, message: "Fetch All Banner Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Banner ///////////////

exports.Get_ById_Banner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        const getData = await bannerDetails.findOne({ where: { banner_id: bannerId } });
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

/////////////// Delete Banner ///////////////

exports.Delete_Banner = async (req, res) => {
    try {
        const bannerId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await bannerDetails.findOne({ where: { banner_id: bannerId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Banner not found!" });
        }
        await bannerDetails.update({ status }, { where: { banner_id: bannerId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};