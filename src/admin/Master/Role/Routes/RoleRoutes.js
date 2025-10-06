const RoleControllers = require("../Controllers/RoleControllers");

module.exports = app => {
    app.post("/api/v1/Create_Role", RoleControllers.Create_Role);
    app.put("/api/v1/Edit_Role/:id", RoleControllers.Edit_Role);
    app.put("/api/v1/Update_Role_Status/:id", RoleControllers.Update_Role_Status);
    app.get("/api/v1/Get_All_Active_Role", RoleControllers.Get_All_Active_Role);
    app.get("/api/v1/Get_All_Role", RoleControllers.Get_All_Role);
    app.get("/api/v1/Get_ById_Role/:id", RoleControllers.Get_ById_Role);
    app.delete("/api/v1/Delete_Role/:id", RoleControllers.Delete_Role);
};