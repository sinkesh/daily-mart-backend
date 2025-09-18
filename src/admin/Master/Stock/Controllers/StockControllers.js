const db = require("../../../../models_routes/index");
const StockDetails = db.StockModels;

/////////////// Create Brand ///////////////

exports.Create_Stock = async (req, res) => {
    try {
        const { product_id, product_name, brand_id, brand_name, category_id, category_name, stock_quantity, reorder_level, unit_price, warehouse_location } = req.body;
        const response = await StockDetails.create({
            product_id,
            product_name,
            brand_id,
            brand_name,
            category_id,
            category_name,
            stock_quantity,
            reorder_level,
            unit_price,
            warehouse_location
        });
        return res.status(200).send({ code: 200, message: "Sub-Category Created Successfully!", data: response });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Edit Brand ///////////////

exports.Edit_Stock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const { product_id, product_name, brand_id, brand_name, category_id, category_name, stock_quantity, reorder_level, unit_price, warehouse_location } = req.body;
        const editData = await StockDetails.findOne({ where: { stock_id: stockId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await StockDetails.update({
            product_id,
            product_name,
            brand_id,
            brand_name,
            category_id,
            category_name,
            stock_quantity,
            reorder_level,
            unit_price,
            warehouse_location
        }, { where: { stock_id: stockId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Brand Status ///////////////

exports.Update_Stock_Status = async (req, res) => {
    try {
        const stockId = req.params.id;
        const { status } = req.body;
        const editData = await StockDetails.findOne({ where: { stock_id: stockId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await StockDetails.update({ status }, { where: { stock_id: stockId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Brand ///////////////

exports.Get_All_Active_Stock = async (req, res) => {
    try {
        const getAllData = await StockDetails.findAll({ where: { status: "ACTIVE" } })
        return res.status(200).send({ code: 200, message: "Fetch All Brand Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Brand ///////////////

exports.Get_All_Stock = async (req, res) => {
    try {
        const getAllData = await StockDetails.findAll()
        return res.status(200).send({ code: 200, message: "Fetch All Brand Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Brand ///////////////

exports.Get_ById_Stock = async (req, res) => {
    try {
        const stockId = req.params.id;
        const getData = await StockDetails.findOne({ where: { stock_id: stockId } });
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

exports.Delete_Stock = async (req, res) => {
    try {
        const stockId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await StockDetails.findOne({ where: { stock_id: stockId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Brand not found!" });
        }
        await StockDetails.update({ status }, { where: { stock_id: stockId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};

