const db = require("../../../../../models_routes/index");
const categoryDetails = db.CategoryModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create Category ///////////////

exports.Create_Category = async (req, res) => {
    try {
        const { category_name } = req.body;
        const categoryImage = req.file;

        let filePath = categoryImage.path.split(path.sep).join('/');
        filePath = filePath.replace(/^public\//, '');

        const getCategoryData = await categoryDetails.findOne({ where: { category_name: category_name } })
        const lastCategory = await categoryDetails.findOne({ order: [['category_id', 'DESC']]  });

        let categoryCode = "CAT-001";

        if (lastCategory && lastCategory.category_code) {
            let lastNumber = parseInt(lastCategory.category_code.split("-")[1]);
            let nextNum = lastNumber + 1;
            categoryCode = `CAT-${String(nextNum).padStart(3, "0")}`;
        }
        if (getCategoryData) {
            return res.status(400).send({ code: 400, message: "Category Already Exits!" })
        } else {
            const response = await categoryDetails.create({
                category_name,
                category_code: categoryCode,
                category_image: baseUrl + filePath
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Edit Category ///////////////

exports.Edit_Category = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { category_name, category_image } = req.body;

        const editData = await categoryDetails.findOne({ where: { category_id: categoryId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

        const alreadyExist = await categoryDetails.findOne({ where: { category_name } });
        if (alreadyExist && alreadyExist.category_id != categoryId) {
            return res.status(400).send({ code: 400, message: "Category Already Exists" });
        }

        let updatedData = { category_name, category_image };

        if (req.file) {
            let filePath = req.file.path.split(path.sep).join('/');
            filePath = filePath.replace(/^public\//, '');
            updatedData.category_image = baseUrl + filePath;
        }

        const updateData = await categoryDetails.update(updatedData, { where: { category_id: categoryId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully", data: updateData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};




/////////////// Update Category Status ///////////////

exports.Update_Category_Status = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { status } = req.body;
        const editData = await categoryDetails.findOne({ where: { category_id: categoryId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await categoryDetails.update({ status }, { where: { category_id: categoryId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Category ///////////////

exports.Get_All_Active_Category = async (req, res) => {
    try {
        const getAllData = await categoryDetails.findAll({ where: { status: "ACTIVE" }, order: [['category_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Category Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Category ///////////////

exports.Get_All_Category = async (req, res) => {
    try {
        const getAllData = await categoryDetails.findAll({ order: [['category_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Category Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Category ///////////////

exports.Get_ById_Category = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const getData = await categoryDetails.findOne({ where: { category_id: categoryId } });
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

/////////////// Delete Category ///////////////

exports.Delete_Category = async (req, res) => {
    try {
        const categoryId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await categoryDetails.findOne({ where: { category_id: categoryId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Category not found!" });
        }
        await categoryDetails.update({ status }, { where: { category_id: categoryId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};
