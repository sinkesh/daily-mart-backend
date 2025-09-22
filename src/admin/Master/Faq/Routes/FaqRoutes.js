const FaqController = require("../Controllers/FaqControllers");

module.exports = app => {
    app.post("/api/v1/Create_Faq", FaqController.Create_Faq);
    app.put("/api/v1/Edit_Faq/:id", FaqController.Edit_Faq);
    app.put("/api/v1/Update_Faq_Status/:id", FaqController.Update_Faq_Status);
    app.get("/api/v1/Get_All_Active_Faq", FaqController.Get_All_Active_Faq);
    app.get("/api/v1/Get_All_Faq", FaqController.Get_All_Faq);
    app.get("/api/v1/Get_ById_Faq/:id", FaqController.Get_ById_Faq);
    app.delete("/api/v1/Delete_Faq/:id", FaqController.Delete_Faq);
};