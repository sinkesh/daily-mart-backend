const PrepaidDiscountControllers = require("../Controllers/PrepaidDiscountControllers");

module.exports = app => {
    app.post('/create_Prepaid_Discount', PrepaidDiscountControllers.create_Prepaid_Discount);
    app.put('/edit_Prepaid_Discount/:id', PrepaidDiscountControllers.edit_Prepaid_Discount);
    app.put('/update_Status_Prepaid_Discount/:id', PrepaidDiscountControllers.update_Status_Prepaid_Discount);
    app.get('/get_ById_Prepaid_Discount/:id', PrepaidDiscountControllers.get_ById_Prepaid_Discount);
    app.get('/get_All_Prepaid_Discount', PrepaidDiscountControllers.get_All_Prepaid_Discount);
    app.delete('/delete_Prepaid_Discount/:id', PrepaidDiscountControllers.delete_Prepaid_Discount);
}