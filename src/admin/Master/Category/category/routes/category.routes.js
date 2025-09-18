const CategoryController = require("../controllers/category.controllers");
const { upload } = require("../../../../../middlewares/category_doc")

module.exports = app => {
    app.post("/api/v1/Create_Category", upload.single("category_image"), CategoryController.Create_Category);
    app.put("/api/v1/Edit_Category/:id", upload.single("category_image"), CategoryController.Edit_Category);
    app.put("/api/v1/Update_Category_Status/:id", CategoryController.Update_Category_Status);
    app.get("/api/v1/Get_All_Active_Category", CategoryController.Get_All_Active_Category);
    app.get("/api/v1/Get_All_Category", CategoryController.Get_All_Category);
    app.get("/api/v1/Get_ById_Category/:id", CategoryController.Get_ById_Category);
    app.delete("/api/v1/Delete_Category/:id", CategoryController.Delete_Category);
};