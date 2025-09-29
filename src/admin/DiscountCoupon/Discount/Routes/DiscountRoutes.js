const DiscountControllers = require("../Controllers/DiscountControllers");

module.exports = app => {
    app.post("/create_Discount", DiscountControllers.create_Discount);
    app.put("/edit_Discount/:id", DiscountControllers.edit_Discount);
    app.put("/update_Discount_Status/:id", DiscountControllers.update_Discount_Status);
    app.get("/get_ById_Discount/:id", DiscountControllers.get_ById_Discount);
    app.get("/get_All_Discount", DiscountControllers.get_All_Discount);
    app.get("/get_All_Discount_Category", DiscountControllers.get_All_Discount_Category);
    app.delete("/delete_Discount/:id", DiscountControllers.delete_Discount);
}