const db = require("../../../models_routes/index");
const CartDetails = db.CartModels;
const ProductViewDetails = db.ProductViewModels;
const GiftProductDetails = db.GiftProductModels;
const ProductDetails = db.ProductModels;
const FinalDiscountAmountDetails = db.FinalDiscountAmountModels;

exports.Create_Add_Cart = async (req, res) => {
    try {
        const { user_id, product_id, quantity } = req.body;

        const productViewData = await ProductViewDetails.findOne({ where: { user_id: user_id } });
        if (productViewData) {
            let increaseView = (productViewData.add_to_cart_count += 1);
            await ProductViewDetails.updateOne({ add_to_cart_count: increaseView }, { where: { product_view_id: productViewData.product_view_id } });
        } else {
            let productview_count = 1;
            await ProductViewDetails.create({
                add_to_cart_count: productview_count,
                user_id: user_id,
            });
        }
        const productFind = await CartDetails.findOne({ where: { user_id: user_id, product_id: product_id, is_gift: false } });

        if (productFind) {
            productFind.quantity += quantity;
            productFind.save();
            return res.status(200).send({ code: 403, message: "Quantity Update Successfully" });
        } else {
            const response = await CartDetails.create({
                quantity,
                user_id,
                product_id,
            });
            const giftProduct = await GiftProductDetails.findOne({ where: { product_id: response.product_id, status: "ACTIVE" } });
            if (giftProduct) {
                var gift_data = await CartDetails.create({
                    quantity: 1,
                    user_id,
                    product_id: giftProduct.gift_item[0].product_id,
                    is_gift: true,
                });
            }
            return res.status(200).send({ status: 200, message: "Add to Cart Successfully!", result: response, gift_data });
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: "Internal Server Error" });
    }
};

exports.Increase_Quantity = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        if (!user_id || !product_id) {
            return res.status(400).send({ status: 400, message: "user_id and product_id are required" });
        }
        const productData = await ProductDetails.findOne({ where: { product_id } });
        if (!productData || productData.stock_quantity <= 0) {
            return res.status(400).send({ status: 400, message: "Product is out of stock" });
        }

        let cartItem = await CartDetails.findOne({ where: { user_id, product_id, is_gift: false } });

        if (!cartItem) {
            cartItem = await CartDetails.create({
                user_id,
                product_id,
                quantity: 1,
                is_gift: false,
            });
            return res.status(200).send({ status: 200, message: "Added to cart with quantity 1", result: cartItem });
        }

        const newQuantity = cartItem.quantity + 1;
        if (newQuantity > productData.stock_quantity) {
            return res.status(400).send({ status: 400, message: "Exceeds available stock quantity" });
        }

        cartItem.quantity = newQuantity;
        await cartItem.save();

        return res.status(200).send({ status: 200, message: "Increase Quantity Successfully!", result: cartItem });

    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};

exports.Decrease_Quantity = async (req, res) => {
    try {
        const { user_id, product_id } = req.body;
        if (!user_id || !product_id) {
            return res.status(400).send({ status: 400, message: "user_id and product_id are required" });
        }
        let cartItem = await CartDetails.findOne({ where: { user_id: user_id, product_id: product_id, is_gift: false } });
        if (!cartItem) {
            return res.status(404).send({ status: 404, message: "Cart item not found" });
        }
        const newQuantity = Math.max(cartItem.quantity - 1, 1);
        cartItem.quantity = newQuantity;
        await cartItem.save();

        return res.status(200).send({ status: 200, message: "Decrease Quantity Successfully!", result: cartItem });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};

exports.Get_All_Cart = async (req, res) => {
    try {
        const getAllData = await CartDetails.findAll({ where: { status: "ACTIVE" } });

        if (!getAllData || getAllData.length === 0) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }

        let array = [];
        let totalAmount = 0;

        for (const cartItem of getAllData) {
            const product = await ProductDetails.findByPk(cartItem.product_id, {
                attributes: ["product_id", "product_name", "offer_price", "main_thumbnail_image", "uom", "weight", "brand_name", "product_sku", "discount_percent", "HSN_code", "category"],
            });

            if (!product) continue;

            const sub_total = cartItem.quantity * product.offer_price;
            totalAmount += sub_total;

            array.push({
                cart_id: cartItem.cart_id,
                product_id: product.product_id,
                user_id: cartItem.user_id,
                quantity: cartItem.quantity,
                product_name: product.product_name,
                offer_price: product.offer_price,
                thumbnail_image: product.thumbnail_image,
                weight: product.weight,
                uom: product.uom,
                brand_name: product.brand_name,
                product_sku: product.product_sku,
                discount_percent: product.discount_percent,
                hsn_code: product.hsn_code,
                category_name: product.category_name,
                status: cartItem.status,
                sub_total,
            });
        }

        return res.status(200).send({  code: 200,  message: "Fetch All Cart Data Successfully!",  result: { cart: array, total: totalAmount }   });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({  code: 500,  message: error.message || "Internal Server Error",  });
    }
};

exports.Delete_Cart = async (req, res) => {
    try {
        const { user_id, product_id, is_gift } = req.body;
        if (!user_id || !product_id) {
            return res.status(400).send({ status: 400, message: "user_id and product_id are required" });
        }
        let dltData = null;
        if (is_gift === true) {
            dltData = await CartDetails.destroy({ where: { user_id, product_id, is_gift: true } });
            return res.status(200).send({ status: 200, message: "Gift cart item deleted successfully", deletedCount: dltData });
        }

        await CartDetails.destroy({ where: { user_id, product_id, is_gift: false } });
        await FinalDiscountAmountDetails.destroy({ where: { user_id } });

        const giftProduct = await GiftProductDetails.findOne({ where: { product_id } });
        if (giftProduct && giftProduct.gift_item?.length > 0) {
            const giftProductId = giftProduct.gift_item[0].product_id;
            dltData = await CartDetails.destroy({ where: { user_id, product_id: giftProductId, is_gift: true } });
        }

        return res.status(200).send({ status: 200, message: "Cart item deleted successfully", deletedGiftCount: dltData || 0 });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
};