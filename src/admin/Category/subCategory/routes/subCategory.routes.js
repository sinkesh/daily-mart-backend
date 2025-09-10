const SubCategoryController = require("../controllers/subCategory.controllers");
const { upload } = require("../../../../middlewares/sub_category_doc")

module.exports = app => {
    app.post("/api/v1/Create_Sub_Category", upload.fields([{ name: "sub_category_image", maxCount: 1 }, { name: "sub_category_banner", maxCount: 1 }]), SubCategoryController.Create_Sub_Category);
    app.put("/api/v1/Edit_Sub_Category/:id", upload.fields([{ name: "sub_category_image", maxCount: 1 }, { name: "sub_category_banner", maxCount: 1 }]), SubCategoryController.Edit_Sub_Category);
    app.get("/api/v1/Get_All_Active_Sub_Category", SubCategoryController.Get_All_Active_Sub_Category);
    app.get("/api/v1/Get_All_Sub_Category", SubCategoryController.Get_All_Sub_Category);
    app.get("/api/v1/Get_ById_Sub_Category/:id", SubCategoryController.Get_ById_Sub_Category);
    app.delete("/api/v1/Delete_Sub_Category/:id", SubCategoryController.Delete_Sub_Category);
};