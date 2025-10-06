const UserRegisterController = require("../Controllers/UserRegisterControllers");
const { upload } = require("../../../../middlewares/user_register_doc")

module.exports = app => {
    app.post("/api/v1/Create_User", upload.fields([{ name: "profile_image", maxCount: 1 }]), UserRegisterController.Create_User);
    app.post('/api/v1/Login_User', UserRegisterController.Login_User);
    app.put('/api/v1/Logout_User/:id', UserRegisterController.Logout_User);
    app.post('/api/v1/Change_Password', UserRegisterController.Change_Password);
    app.put("/api/v1/Edit_User", upload.fields([{ name: "profile_image", maxCount: 1 }]), UserRegisterController.Edit_User);
    app.put("/api/v1/Update_User_Status/:id", UserRegisterController.Update_User_Status);
    app.get("/api/v1/Get_All_Active_User", UserRegisterController.Get_All_Active_User);
    app.get("/api/v1/Get_All_User", UserRegisterController.Get_All_User);
    app.get("/api/v1/Get_ById_User", UserRegisterController.Get_ById_User);
    app.delete("/api/v1/Delete_User/:id", UserRegisterController.Delete_User);
};