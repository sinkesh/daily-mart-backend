const db = require("../../../../models_routes/index");
const DiscountCouponDetails = db.DiscountCouponModels;
const ProductDetails = db.ProductModels;
const moment = require('moment');

/////////////// Create Discount ///////////////

exports.create_Discount = async (req, res) => {
    try {
        const { product_id, sub_category_id, product_name, sub_category_name, sub_category_image, sub_category_banner, sub_category_description, product_value_min,
            coupon_code, discount_value_type, from_date, to_date, discount_name, discount_type, purchase_value_max, discount_value, description } = req.body;

        const discouuntDetails = await DiscountCouponDetails.findOne({ product_id: product_id });
        if (discouuntDetails) {
            return res.status(403).send({ code: 403, message: "Product Name Already Exists!" });
        } else {
            const productData = await ProductDetails.findOne({ _id: product_id });

            let discountofferPrice;
            let totalPrecentage;
            if (discount_value_type === "fixed") {
                totalPrecentage = discount_value
            } else if (discount_value_type === "percent") {
                totalPrecentage = discount_value
            }
            const response = await DiscountCouponDetails.create({
                product_id,
                sub_category_id,
                product_name,
                sub_category_name,
                sub_category_image,
                sub_category_banner,
                sub_category_description,
                product_value_min,
                coupon_code,
                discount_value_type,
                from_date,
                to_date,
                discount_name,
                discount_type,
                purchase_value_max,
                discount_value: totalPrecentage,
                price: productData.price,
                offer_price: productData.offer_price,
                discount_offer_price: discountofferPrice,
                description
            });
            return res.status(200).send({ code: 200, message: "Product Discount Created Successfully!", result: response });
        }
    } catch (error) {
        console.log(error, "error")
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Edit Discount ///////////////

exports.edit_Discount = async (req, res) => {
    try {
        const discountId = req.params.id;
        const { product_id, sub_category_id, product_name, sub_category_name, sub_category_image, sub_category_banner, sub_category_description, product_value_min, coupon_code, discount_value_type, from_date, to_date, discount_name, discount_type,
            purchase_value_max, discount_value, valid_between, re_usable, description } = req.body;
        const editData = await DiscountCouponDetails.findOne({ _id: discountId });
        const productData = await ProductDetails.findOne({ _id: product_id });

        let discountofferPrice;
        let totalPrecentage;
        let finalDiscountPercent;
        if (discount_value_type === "fixed") {
            discountofferPrice = productData.offer_price - discount_value;
            const discountPrice = productData.price - discountofferPrice
            totalPrecentage = (discountPrice / productData.price) * 100
        } else if (discount_value_type === "percent") {
            const discountPercentage = discount_value / 100;
            const discountAmount = productData.offer_price * discountPercentage;
            const editedAmount = productData.offer_price - discountAmount;
            discountofferPrice = Math.round(productData.offer_price - discountAmount);
            finalDiscountPercent = (1 - (editedAmount / productData.price)) * 100 // final discount master valid end date
        }
        if (editData) {

            const updateData = await DiscountCouponDetails.updateOne({
                product_id,
                sub_category_id,
                product_name,
                sub_category_name,
                sub_category_image,
                sub_category_banner,
                sub_category_description,
                product_value_min,
                coupon_code,
                discount_value_type,
                from_date,
                to_date,
                discount_name,
                discount_type,
                purchase_value_max,
                discount_value: discount_value,
                price: productData.price,
                offer_price: productData.offer_price,
                valid_between,
                re_usable,
                description
            }, { where: { discount_coupon_id: discountId } })
            return res.status(200).send({ code: 200, message: "Product Updated Discount Successfully!", result: updateData })
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.log(error, "error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" })
    };
};

/////////////// Update Discount Discount ///////////////


exports.update_Discount_Status = async (req, res) => {
    try {
        const discountId = req.params.id;
        const { status } = req.body;
        const findData = await DiscountCouponDetails.findOne({ where: { discount_coupon_id: discountId } });
        if (findData) {
            const updateData = await DiscountCouponDetails.updateOne({ status }, { where: { discount_coupon_id: discountId } });
            return res.status(200).send({ code: 200, message: "Status Updated Successfully!", result: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" })
        }
    } catch (error) {
        console.error(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

/////////////// Get ById Discount ///////////////

exports.get_ById_Discount = async (req, res) => {
    try {
        const discountId = req.params.id;
        const getData = await DiscountCouponDetails.findOne({ where: { discount_coupon_id: discountId } })
        if (getData) {
            return res.status(200).send({ code: 200, message: "Fetch Data Successfully", result: getData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Get All Discount ///////////////

exports.get_All_Discount = async (req, res) => {
    try {
        const currentDate = moment();
        const getAllData = await DiscountCouponDetails.findAll();
        if (getAllData) {
            getAllData.forEach(async (discount) => {
                const fromDate = discount.from_date;
                const toDate = discount.to_date;
                toDate.setHours(23, 59, 59, 999);
                if (moment(currentDate).isBetween(fromDate, toDate)) {
                    discount.status = true;
                } else {
                    discount.status = false;
                }
                await discount.save();
            });
            return res.status(200).send({ code: 200, message: "Fetched All Discount Data Successfully!", result: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

/////////////// Get All Discount Category ///////////////

exports.get_All_Discount_Category = async (req, res) => {
    try {
        const getAllData = await DiscountCouponDetails.findAll({ where: { discount_type: "subcategory" } })
        if (getAllData) {
            return res.status(200).send({ code: 200, message: "Fetch All Discount Category Data Successfully!", result: getAllData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Delete Discount ///////////////

exports.delete_Discount = async (req, res) => {
    try {
        const discountId = req.params.id;
        const getData = await DiscountCouponDetails.findByPk(discountId);
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await DiscountCouponDetails.destroy({ where: { id: discountId } });
        return res.status(200).send({ code: 200, message: "Discount Data is Deleted Successfully!", result: getData });
    } catch (error) {
        console.error(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};