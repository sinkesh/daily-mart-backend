const CouponControllers = require("../Controlellers/CouponControllers");

module.exports = app => {
    app.post("/api/v1/Create_Coupon", CouponControllers.Create_Coupon);
    app.put("/api/v1/Edit_Coupon/:id", CouponControllers.Edit_Coupon);
    app.put("/api/v1/Update_Coupon_Status/:id", CouponControllers.Update_Coupon_Status);
    app.get("/api/v1/Get_ById_Coupon/:id", CouponControllers.Get_ById_Coupon);
    app.get("/api/v1/Get_All_Coupon", CouponControllers.Get_All_Coupon);
    app.delete("/api/v1/Delete_Coupon/:id", CouponControllers.Delete_Coupon);
};