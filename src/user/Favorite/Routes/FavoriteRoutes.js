const FavoriteControllers = require("../Controllers/FavoriteControllers");

module.exports = app => {
    app.post("/api/v1/Create_Wish_List", FavoriteControllers.Create_Wish_List);
    app.put("/api/v1/Edit_Wish_List/:id", FavoriteControllers.Edit_Wish_List);
    app.put("/api/v1/Update_Status_Wish_List/:id", FavoriteControllers.Update_Status_Wish_List);
    app.get("/api/v1/Get_ById_Wish_List/:id", FavoriteControllers.Get_ById_Wish_List);
    app.get("/api/v1/Get_All_Wish_List/:user_id", FavoriteControllers.Get_All_Wish_List);
    app.delete("/api/v1/Delete_Wish_List/:id", FavoriteControllers.Delete_Wish_List);

};