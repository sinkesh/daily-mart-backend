const db = require("../../../../models_routes/index");
const UserDetails = db.UserModels;
const baseUrl = "http://localhost:8000/";
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "your_jwt_secret";
const saltRounds = 10;

/////////////// Create User ///////////////

exports.Create_User = async (req, res) => {
    try {
        const { first_name, last_name, user_name, email, is_email_verified, password, phone_number, is_phone_verified, role, gender, date_of_birth, address, country, country_code, state, city, pincode, last_login } = req.body;

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
                country_code,
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



exports.Login_User = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserDetails.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send({ code: 400, message: "Invalid Email or Password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ code: 400, message: "Invalid Email or Password" });
        }

        // Optionally generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secretKey, { expiresIn: "1h" });

        return res.status(200).send({
            code: 200,
            message: "Login Successful",
            data: {
                user: {
                    id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};


exports.Change_Password = async (req, res) => {
    try {
        const { email, old_password, new_password, confirm_password } = req.body;

        if (!old_password || !new_password || !confirm_password) {
            return res.status(400).send({ code: 400, message: "All fields are required." });
        }

        if (new_password !== confirm_password) {
            return res.status(400).send({ code: 400, message: "New password and confirm password do not match." });
        }

        // Find user
        const user = await UserDetails.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ code: 404, message: "User not found." });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(old_password, user.password);
        if (!isMatch) {
            return res.status(400).send({ code: 400, message: "Old password is incorrect." });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({ code: 200, message: "Password changed successfully." });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
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
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await UserDetails.update({
            first_name,
            last_name,
            user_name,
            email,
            is_email_verified,
            password: hashedPassword,
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
        const getAllData = await UserDetails.findAll({ where: { status: "ACTIVE" }, order: [['user_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All User Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All User ///////////////

exports.Get_All_User = async (req, res) => {
    try {
        const getAllData = await UserDetails.findAll({ where: { order: [['user_id', 'DESC']] } })
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
