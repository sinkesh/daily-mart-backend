const BrandController = require("../Controllers/BrandControllers");
const { upload } = require("../../../../middlewares/brand_doc")

module.exports = app => {
    app.post("/api/v1/Create_Brand", upload.fields([{ name: "brand_logo", maxCount: 1 }]), BrandController.Create_Brand);
    app.put("/api/v1/Edit_Brand/:id", upload.fields([{ name: "brand_logo", maxCount: 1 }]), BrandController.Edit_Brand);
    app.put("/api/v1/Update_Brand_Status/:id", BrandController.Update_Brand_Status);
    app.get("/api/v1/Get_All_Active_Brand", BrandController.Get_All_Active_Brand);
    app.get("/api/v1/Get_All_Brand", BrandController.Get_All_Brand);
    app.get("/api/v1/Get_ById_Brand/:id", BrandController.Get_ById_Brand);
    app.delete("/api/v1/Delete_Brand/:id", BrandController.Delete_Brand);
};