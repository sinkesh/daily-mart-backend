const db = require("../../../../models_routes/index");
const couponDetails = db.CouponModels;

exports.Create_Coupon = async (req, res) => {
    try {
        const { coupon_name, coupon_type, purchase_value_min, purchase_value_max, valid_between, re_usable, coupon_code, description,
            from_date, to_date, discount_value, discount_type, max_discount_amount, max_ordervalue } = req.body;
        const getData = await couponDetails.findOne({ where: { coupon_name: coupon_name } })
        if (getData) {
            return res.status(403).send({ code: 403, message: "Coupon Already Exists!" })
        }
        const response = await couponDetails.create({
            coupon_name,
            coupon_type,
            purchase_value_min,
            purchase_value_max,
            discount_value,
            valid_between,
            re_usable,
            coupon_code,
            description,
            from_date,
            to_date,
            discount_type,
            max_ordervalue,
            max_discount_amount
        });
        return res.status(200).send({ code: 200, message: "Coupon Created Successfully!", result: response })
    } catch (error) {
        console.log(error, "error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Edit Coupon ///////////////

exports.Edit_Coupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const { coupon_name, coupon_type, purchase_value_min, purchase_value_max, discount_value, valid_between, re_usable, coupon_code, description,
            from_date, to_date, discount_type, max_discount_amount, max_ordervalue } = req.body;
        const findData = await couponDetails.findOne({ where: { coupon_id: couponId } });

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        const toDate = new Date(to_date);

        let status = false;
        if (toDate > currentDate) {
            status = true;
        }
        if (findData) {
            const updateData = await couponDetails.updateOne({
                coupon_name,
                coupon_type,
                purchase_value_min,
                purchase_value_max,
                discount_value,
                valid_between,
                re_usable,
                coupon_code,
                description,
                from_date,
                to_date,
                discount_type,
                max_discount_amount,
                max_ordervalue,
                status
            }, { where: { coupon_id: couponId } });
            return res.status(200).send({ code: 200, message: "Coupon Updated Successfully!", result: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Update Coupon Status ///////////////

exports.Update_Coupon_Status = async (req, res) => {
    try {
        const couponId = req.params.id;
        const { status } = req.body;
        const findData = await couponDetails.findOne({ where: { coupon_id: couponId } });
        if (findData) {
            const updateData = await couponDetails.updateOne({ status }, { where: { coupon_id: couponId } });
            return res.status(200).send({ code: 200, message: "Coupon Status Updated Successfully!", result: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Coupon ///////////////

exports.Get_ById_Coupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const getData = await couponDetails.findOne({ where: { coupon_id: couponId } });
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Coupon Data Successfully!", result: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Get All Coupon ///////////////

exports.Get_All_Coupon = async (req, res) => {
    try {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        await couponDetails.update({ status: false }, { where: { to_date: { [Op.lt]: currentDate } } });
        const getAllData = await couponDetails.findAll();

        return res.status(200).send({ code: 200, message: "Fetch All Coupon Data Successfully", result: getAllData });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};


/////////////// Delete Coupon ///////////////


exports.Delete_Coupon = async (req, res) => {
    try {
        const couponId = req.params.id;
        const getData = await couponDetails.findByPk(couponId);
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await couponDetails.destroy({ where: { coupon_id: couponId } });
        return res.status(200).send({ code: 200, message: "Coupon Data is Deleted Successfully!", result: getData });
    } catch (error) {
        console.error(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};
