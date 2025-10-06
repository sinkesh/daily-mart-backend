const db = require("../../../../models_routes/index");
const RoleDetails = db.RoleModels;

/////////////// Create Role ///////////////

exports.Create_Role = async (req, res) => {
    try {
        const { role_name } = req.body;
        const response = await RoleDetails.create({
            role_name
        });
        return res.status(200).send({ code: 200, message: "Sub-Category Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Edit Role ///////////////

exports.Edit_Role = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { role_name } = req.body;
        const editData = await RoleDetails.findOne({ where: { role_id: roleId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await RoleDetails.update({ role_name }, { where: { role_id: roleId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Role Status ///////////////

exports.Update_Role_Status = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { status } = req.body;
        const editData = await RoleDetails.findOne({ where: { role_id: roleId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await RoleDetails.update({ status }, { where: { role_id: roleId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Role ///////////////

exports.Get_All_Active_Role = async (req, res) => {
    try {
        const getAllData = await RoleDetails.findAll({ where: { status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Role Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Role ///////////////

exports.Get_All_Role = async (req, res) => {
    try {
        const getAllData = await RoleDetails.findAll()
        return res.status(200).send({ code: 200, message: "Fetch All Role Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Role ///////////////

exports.Get_ById_Role = async (req, res) => {
    try {
        const roleId = req.params.id;
        const getData = await RoleDetails.findOne({ where: { role_id: roleId } });
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

/////////////// Delete Role ///////////////

exports.Delete_Role = async (req, res) => {
    try {
        const roleId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await RoleDetails.findOne({ where: { role_id: roleId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Brand not found!" });
        }
        await RoleDetails.update({ status }, { where: { role_id: roleId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};