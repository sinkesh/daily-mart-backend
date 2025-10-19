const db = require("../../../models_routes/index");
const WishlistDetails = db.WishlistModels;
const ProductViewDetails = db.ProductViewModels;
const ProductDetails = db.ProductModels;
const UserDetails = db.UserModels;

/////////////// Create Wish List ///////////////

exports.Create_Wish_List = async (req, res) => {
    try {
        const { user_id, product_id, favorite } = req.body;
        const existingData = await WishlistDetails.findOne({ where: { user_id, product_id } });
        const userData = await UserDetails.findOne({ where: { user_id: user_id } });

        const productViewData = await ProductViewDetails.findOne({ where: { user_id: user_id } });
        if (productViewData) {
            let increaseView = productViewData.add_to_wishlish_count += 1
            await ProductViewDetails.update({ add_to_wishlish_count: increaseView }, { where: { product_view_id: productViewData.product_view_id } });
        } else {
            let productview_count = 1;
            await ProductViewDetails.create({
                add_to_wishlish_count: productview_count,
                user_id: user_id,
            });
        };

        if (existingData) {
            if (existingData.favorite !== favorite) {
                existingData.favorite = favorite;
                await existingData.save();
                return res.status(200).send({ code: 200, message: "Wish List Updated Successfully!", result: existingData });
            } else {
                return res.status(403).send({ code: 403, message: "Already Exists in Wish List with favorite set to true" });
            }
        } else {
            if (!user_id) {
                return res.status(403).send({ code: 403, message: "Please login first." });
            } else {
                const fullName = userData.first_name + ' ' + userData.last_name;
                const response = await WishlistDetails.create({
                    user_id,
                    user_name: fullName,
                    product_id,
                    favorite
                });
                return res.status(200).send({ code: 200, message: "Wish List Added Successfully!", result: response });
            }
        }
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

/////////////// Edit Wish List ///////////////

exports.Edit_Wish_List = async (req, res) => {
    try {
        const wishListId = req.params.id;
        const { user_id, product_id, favorite } = req.body;
        const findData = await WishlistDetails.findOne({ where: { favorite_id: wishListId } });
        const userData = await UserDetails.findOne({ where: { user_id: user_id } });
        if (findData) {
            const fullName = userData.first_name + ' ' + userData.last_name;
            const updateData = await WishlistDetails.update({
                user_id,
                user_name: fullName,
                product_id,
                favorite
            }, { favorite_id: wishListId });
            return res.status(200).send({ code: 200, message: "Wish List Updated Successfully!", result: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Update Status Wish List ///////////////

exports.Update_Status_Wish_List = async (req, res) => {
    try {
        const wishListId = req.params.id;
        const editData = await WishlistDetails.findOne({ where: { favorite_id: wishListId } });
        if (editData) {
            const updateData = await WishlistDetails.update({ status: req.body.status }, { favorite_id: wishListId });
            return res.status(200).send({ code: 200, message: "Wish List Status Updated Successfully!", data: updateData });
        } else {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        };
    } catch (error) {
        console.log(error, "Error");
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    };
};

/////////////// Get ById Wish List ///////////////

exports.Get_ById_Wish_List = async (req, res) => {
    try {
        const wishListId = req.params.id;
        const wishListItem = await WishlistDetails.findOne({ where: { favorite_id: wishListId, favorite: true } });
        if (!wishListItem) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        const product = await ProductDetails.findOne({ where: { product_id: wishListItem.product_id } });
        return res.status(200).send({
            code: 200,
            message: "Fetch Data Successfully!",
            result: {
                favorite_id: wishListItem.favorite_id,
                user_id: wishListItem.user_id,
                favorite: wishListItem.favorite,
                is_gift: wishListItem.is_gift,
                createdAt: wishListItem.createdAt,
                product_details: product || {},
            },
        });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

/////////////// Get All Favorite Wish List ///////////////

exports.Get_All_Wish_List = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        if (!user_id) {
            return res.status(400).send({ code: 400, message: "user_id is required" });
        }
        const wishListData = await WishlistDetails.findAll({
            where: { user_id, favorite: true, is_gift: false },
            order: [["createdAt", "DESC"]],
        });
        if (!wishListData || wishListData.length === 0) {
            return res.status(404).send({ code: 404, message: "No wishlist items found" });
        }
        const formattedData = [];
        for (const item of wishListData) {
            const product = await ProductDetails.findOne({ where: { product_id: item.product_id } });
            formattedData.push({
                favorite_id: item.favorite_id,
                user_id: item.user_id,
                favorite: item.favorite,
                is_gift: item.is_gift,
                createdAt: item.createdAt,
                product_details: product || {},
            });
        }

        return res.status(200).send({ code: 200, message: "Wishlist fetched successfully", result: formattedData });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};

/////////////// Delete Wish List ///////////////

exports.Delete_Wish_List = async (req, res) => {
    try {
        const wishListId = req.params.id;
        const getData = await WishlistDetails.findOne({ where: { favorite_id: wishListId } });
        if (!getData) {
            return res.status(404).send({ code: 404, message: "Record Not Found" });
        }
        await WishlistDetails.destroy({ where: { favorite_id: wishListId } });
        return res.status(200).send({ code: 200, message: "Wish List Data is Deleted Successfully!" });
    } catch (error) {
        console.error("Error in Delete_Wish_List:", error);
        return res.status(500).send({ code: 500, message: error.message || "Internal Server Error" });
    }
};