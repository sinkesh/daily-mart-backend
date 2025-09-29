const CartControllers = require("../Controllers/CartControllers");

module.exports = app => {
    app.post("/api/v1/Create_Add_Cart", CartControllers.Create_Add_Cart);
    app.post("/api/v1/Increase_Quantity", CartControllers.Increase_Quantity);
    app.post("/api/v1/Decrease_Quantity", CartControllers.Decrease_Quantity);
    app.get('/api/v1/Get_All_Cart', CartControllers.Get_All_Cart);
    app.delete('/api/v1/Delete_Cart', CartControllers.Delete_Cart);
};