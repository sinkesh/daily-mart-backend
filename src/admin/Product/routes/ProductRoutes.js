const ProductController = require("../Controllers/ProductControllers");
const { upload } = require("../../../middlewares/product_doc")

module.exports = app => {
    app.post("/api/v1/Create_Product ", upload.fields([{ name: "sub_category_image", maxCount: 1 }, { name: "sub_category_banner", maxCount: 1 }]), ProductController.Create_Product );
    app.put("/api/v1/Edit_Product /:id", upload.fields([{ name: "sub_category_image", maxCount: 1 }, { name: "sub_category_banner", maxCount: 1 }]), ProductController.Edit_Product );
    app.put("/api/v1/Update_Product _Status/:id", ProductController.Update_Product_Status);
    app.get("/api/v1/Get_All_Active_Product ", ProductController.Get_All_Active_Product );
    app.get("/api/v1/Get_All_Product ", ProductController.Get_All_Product );
    app.get("/api/v1/Get_ById_Product /:id", ProductController.Get_ById_Product );
    app.delete("/api/v1/Delete_Product /:id", ProductController.Delete_Product );
};