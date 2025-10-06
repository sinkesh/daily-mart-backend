const express = require("express");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

///////////////////// Middlewares /////////////////////

app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    })
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use("/category_doc", express.static(path.join(__dirname, "/category_doc")));
app.use("/sub_category_doc", express.static(path.join(__dirname, "/sub_category_doc")));
app.use("/brand_doc", express.static(path.join(__dirname, "/brand_doc")));
app.use("/banner_doc", express.static(path.join(__dirname, "/banner_doc")));
app.use("/product_doc", express.static(path.join(__dirname, "/product_doc")));
app.use("/user_register_doc", express.static(path.join(__dirname, "/user_register_doc")));

///////////////////// Database /////////////////////

const db = require("./src/models_routes");

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log("✅ Synced DB successfully...")
    }).catch((err) => {
        console.log("❌ Failed to sync DB:", err.message)
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Daily Mart Application." });
});

///////////////////// Routes /////////////////////////

require("./src/admin/Master/Category/category/routes/category.routes")(app);
require("./src/admin/Master/Category/subCategory/routes/subCategory.routes")(app);
require("./src/admin/Master/Stock/Routes/StockRoutes")(app);
require("./src/admin/Master/Faq/Routes/FaqRoutes")(app);
require("./src/admin/Master/Brand/Routes/BrandRoutes")(app);
require("./src/admin/Master/Banner/Routes/BannerRoutes")(app);
require("./src/admin/Master/Role/Routes/RoleRoutes")(app);
require("./src/admin/Product/routes/ProductRoutes")(app);
require("./src/admin/DiscountCoupon/Coupon/Routes/CouponRoutes")(app);
require("./src/admin/DiscountCoupon/Discount/Routes/DiscountRoutes")(app);
require("./src/admin/DiscountCoupon/PrepaidDiscount/Routes/PrepaidDiscountRoutes")(app);
require("./src/user/Auth/UserRegister/Routes/UserRegisterRoutes")(app);
require("./src/user/Cart/Routes/CartRoutes")(app);

///////////////////// Server /////////////////////////

const PORT = process.env.SERVER_PORT || 8000;
app.listen(PORT, () => {
    console.log(`\x1b[32m🚀 Server is running on port \x1b[36m${PORT}\x1b[0m`);
});