const db = require("../../../../models_routes/index");
const faqDetails = db.FaqModels;

/////////////// Create Faq ///////////////

exports.Create_Faq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const getFaqData = await faqDetails.findOne({ where: { question: question, answer: answer } })
        if (getFaqData) {
            return res.status(400).send({ code: 400, message: "Question Answer Already Exits!" })
        } else {
            const response = await faqDetails.create({
                question,
                answer
            });
            return res.status(200).send({ code: 200, message: "Created Successfully!", data: response });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Edit Faq ///////////////

exports.Edit_Faq = async (req, res) => {
    try {
        const faqId = req.params.id;
        const { question, answer } = req.body;
        const editData = await faqDetails.findOne({ where: { faq_id: faqId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        const alreadyExist = await faqDetails.findOne({ where: { question: question, answer: answer } });
        if (alreadyExist) {
            return res.status(400).send({ code: 400, message: "Question Already Exists" });
        }
        await faqDetails.update({
            question,
            answer
        }, { where: { faq_id: faqId } });
        return res.status(200).send({ code: 200, message: "Updated Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Update Faq Status ///////////////

exports.Update_Faq_Status = async (req, res) => {
    try {
        const faqId = req.params.id;
        const { status } = req.body;
        const editData = await faqDetails.findOne({ where: { faq_id: faqId } });
        if (!editData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await faqDetails.update({ status }, { where: { faq_id: faqId } });
        return res.status(200).send({ code: 200, message: "Updated Status Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

/////////////// Get All Faq ///////////////

exports.Get_All_Active_Faq = async (req, res) => {
    try {
        const getAllData = await faqDetails.findAll({ where: { status: "ACTIVE" }, order: [['faq_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Faq Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get All Faq ///////////////

exports.Get_All_Faq = async (req, res) => {
    try {
        const getAllData = await faqDetails.findAll({ order: [['faq_id', 'DESC']] })
        return res.status(200).send({ code: 200, message: "Fetch All Faq Successfully", data: getAllData });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    };
};

/////////////// Get ById Faq ///////////////

exports.Get_ById_Faq = async (req, res) => {
    try {
        const faqId = req.params.id;
        const getData = await faqDetails.findOne({ where: { faq_id: faqId } });
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

/////////////// Delete Faq ///////////////

exports.Delete_Faq = async (req, res) => {
    try {
        const faqId = req.params.id;
        if (!req.body || !("status" in req.body)) {
            return res.status(400).send({ code: 400, message: "status field is required!" });
        }
        const { status } = req.body;
        if (status !== "ACTIVE" && status !== "INACTIVE") {
            return res.status(400).send({ code: 400, message: "status must be either 'ACTIVE' or 'INACTIVE' only!" });
        }
        const getData = await faqDetails.findOne({ where: { faq_id: faqId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Faq not found!" });
        }
        await faqDetails.update({ status }, { where: { faq_id: faqId } });
        return res.status(200).send({ code: 200, message: "Status Updated Successfully!" });
    } catch (error) {
        console.log("error", error)
        return res.status(500).send({ code: 500, message: "Internal Server Error", error: error.message });
    }
};
