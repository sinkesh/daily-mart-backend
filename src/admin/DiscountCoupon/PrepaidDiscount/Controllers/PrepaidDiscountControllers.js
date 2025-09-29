const db = require("../../../../models_routes/index");
const PrepaidDiscountDetails = db.PrepaidDiscountModels;

/////////////// Create Prepaid Discount ///////////////

exports.create_Prepaid_Discount = async (req, res) => {
    try {
        const { title, prepaid_discount } = req.body;
        let findDiscountData = await PrepaidDiscountDetails.findOne();
        if (findDiscountData) {
            findDiscountData.prepaid_discount = prepaid_discount;
            await findDiscountData.save();
            return res.status(200).send({ code: 200, message: "Prepaid Discount Updated Successfully!", data: findDiscountData });
        } else {
            const response = await PrepaidDiscountDetails.create({
                title,
                prepaid_discount
            });
            return res.status(200).send({ code: 200, message: "Prepaid Discount Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Edit Prepaid Discount ///////////////

exports.edit_Prepaid_Discount = async (req, res) => {
    try {
        const prepaidDiscountId = req.params.id;
        const { title, prepaid_discount } = req.body;
        const editData = await PrepaidDiscountDetails.findOne({ where: { prepaid_discount_id: prepaidDiscountId } });
        if (editData) {
            const updateData = await PrepaidDiscountDetails.updateOne({
                title,
                prepaid_discount
            }, { where: { prepaid_discount_id: prepaidDiscountId } });
            return res.status(200).send({ code: 200, message: "Prepaid Discount Updated Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Update Status Prepaid Discount ///////////////

exports.update_Status_Prepaid_Discount = async (req, res) => {
    try {
        const prepaidDiscountId = req.params.id;
        const { status } = req.body
        const editData = await PrepaidDiscountDetails.findOne({ where: { prepaid_discount_id: prepaidDiscountId } });
        if (editData) {
            const updateData = await PrepaidDiscountDetails.updateOne({ status }, { where: { prepaid_discount_id: prepaidDiscountId } });
            return res.status(200).send({ code: 200, message: "Prepaid Discount Status Updated Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Get ById Prepaid Discount ///////////////

exports.get_ById_Prepaid_Discount = async (req, res) => {
    try {
        const prepaidDiscountId = req.params.id;
        const getData = await PrepaidDiscountDetails.findOne({ where: { prepaid_discount_id: prepaidDiscountId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully!", data: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Get All Prepaid Discount ///////////////

exports.get_All_Prepaid_Discount = async (req, res) => {
    try {
        const getAllData = await PrepaidDiscountDetails.findAll();
        return res.status(200).send({ code: 200, message: "Fetch All Prepaid Discount Data Successfully!", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Delete Prepaid Discount ///////////////

exports.delete_Prepaid_Discount = async (req, res) => {
    try {
        const prepaidDiscountId = req.params.id;
        const getData = await PrepaidDiscountDetails.findByPk(prepaidDiscountId);
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await PrepaidDiscountDetails.destroy({ where: { prepaid_discount_id: prepaidDiscountId } });
        return res.status(200).send({ code: 200, message: "Prepaid Discount Data is Deleted Successfully!", data: getData });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};