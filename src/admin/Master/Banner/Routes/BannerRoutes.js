const BannerController = require("../Controllers/BannerControllers");
const { upload } = require("../../../../middlewares/banner_doc")

module.exports = app => {
    app.post("/api/v1/Create_Banner", upload.single("banner_image"), BannerController.Create_Banner);
    app.put("/api/v1/Edit_Banner/:id", upload.single("banner_image"), BannerController.Edit_Banner);
    app.put("/api/v1/Update_Banner_Status/:id", BannerController.Update_Banner_Status);
    app.get("/api/v1/Get_All_Active_Banner", BannerController.Get_All_Active_Banner);
    app.get("/api/v1/Get_All_Banner", BannerController.Get_All_Banner);
    app.get("/api/v1/Get_ById_Banner/:id", BannerController.Get_ById_Banner);
    app.delete("/api/v1/Delete_Banner/:id", BannerController.Delete_Banner);
};