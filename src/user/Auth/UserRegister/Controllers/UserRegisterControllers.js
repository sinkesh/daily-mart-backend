const db = require("../../../../models_routes/index");
const UserDetails = db.UserModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');

/////////////// Create User ///////////////

exports.Create_User = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, is_email_verified, password, phone_number, is_phone_verified, role, gender, date_of_birth, address, country, state, city, pincode, last_login } = req.body;

        let profileImage = req.files?.profile_image?.[0]?.path || "";
        let filePath = profileImage ? profileImage.split(path.sep).join('/').replace(/^public\//, '') : '';

        const userData = await UserDetails.findOne({ where: { email: email } })
        if (userData) {
            return res.status(400).send({ code: 400, message: "User Email Already Exits!" })
        } else {
            const response = await UserDetails.create({
                first_name,
                last_name,
                user_name,
                email,
                is_email_verified,
                password,
                phone_number,
                is_phone_verified,
                role,
                gender,
                date_of_birth,
                profile_image: filePath ? baseUrl + filePath : '',
                address,
                country,
                state,
                city,
                pincode,
                last_login
            });
            return res.status(200).send({ code: 200, message: "User Registerd Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Edit User ///////////////

exports.Edit_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const { first_name, last_name, user_name, email, is_email_verified, password, phone_number, is_phone_verified, role, gender, date_of_birth, address, country, state, city, pincode, last_login } = req.body;
        const editData = await UserDetails.findOne({ where: { user_id: userId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        const alreadyExist = await UserDetails.findOne({ where: { email: email } });
        if (alreadyExist) {
            return res.status(400).send({ code: 400, message: "User Email Already Exits!" });
        }
        await UserDetails.update({
            first_name,
            last_name,
            user_name,
            email,
            is_email_verified,
            password,
            phone_number,
            is_phone_verified,
            role,
            gender,
            date_of_birth,
            profile_image: filePath ? baseUrl + filePath : '',
            address,
            country,
            state,
            city,
            pincode,
            last_login
        }, { where: { user_id: userId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update User Status ///////////////

exports.Update_User_Status = async (req, res) => {
    try {
        const userId = req.params.id;
        const { status } = req.body;
        const editData = await UserDetails.findOne({ where: { user_id: userId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await UserDetails.update({ status }, { where: { user_id: userId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All User ///////////////

exports.Get_All_Active_User = async (req, res) => {
    try {
        const getAllData = await UserDetails.findAll({ where: { status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All User Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All User ///////////////

exports.Get_All_User = async (req, res) => {
    try {
        const getAllData = await UserDetails.findAll()
        return res.status(200).send({ code: 200, message: "Fetch All User Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById User ///////////////

exports.Get_ById_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const getData = await UserDetails.findOne({ where: { user_id: userId } });
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

/////////////// Delete User ///////////////

exports.Delete_User = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await UserDetails.findOne({ where: { user_id: userId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "User not found!" });
        }
        await UserDetails.update({ status }, { where: { user_id: userId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};
