const StockController = require("../Controllers/StockControllers");

module.exports = app => {
    app.post("/api/v1/Create_Stock", StockController.Create_Stock);
    app.put("/api/v1/Edit_Stock/:id", StockController.Edit_Stock);
    app.put("/api/v1/Update_Stock_Status/:id", StockController.Update_Stock_Status);
    app.get("/api/v1/Get_All_Active_Stock", StockController.Get_All_Active_Stock);
    app.get("/api/v1/Get_All_Stock", StockController.Get_All_Stock);
    app.get("/api/v1/Get_ById_Stock/:id", StockController.Get_ById_Stock);
    app.delete("/api/v1/Delete_Stock/:id", StockController.Delete_Stock);
};