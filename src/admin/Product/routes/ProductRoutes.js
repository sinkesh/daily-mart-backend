const ProductController = require("../Controllers/ProductControllers");
const { upload } = require("../../../middlewares/product_doc")

module.exports = app => {
    app.post("/api/v1/Create_Product", upload.fields([{ name: "thumbnail_image", maxCount: 1 }, { name: "video_url", maxCount: 1 }]), ProductController.Create_Product);
    app.put("/api/v1/Edit_Product/:id", upload.fields([{ name: "thumbnail_image", maxCount: 1 }, { name: "video_url", maxCount: 1 }]), ProductController.Edit_Product);
    app.put("/api/v1/Update_Product_Status/:id", ProductController.Update_Product_Status);
    app.get("/api/v1/Get_All_Active_Product", ProductController.Get_All_Active_Product);
    app.get("/api/v1/Get_All_Product", ProductController.Get_All_Product);
    app.get("/api/v1/Get_ById_Product/:id", ProductController.Get_ById_Product);
    app.delete("/api/v1/Delete_Product/:id", ProductController.Delete_Product);
};