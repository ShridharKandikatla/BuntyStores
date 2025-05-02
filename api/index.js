const express = require("express");
const authRoutes = require("./v1/routes/auth.js");
const productsRoutes = require("./v1/routes/products.js");
const cartRoutes = require("./v1/routes/cart.js");
const inwardRoutes = require("./v1/routes/inward.js");
const stockRoutes = require("./v1/routes/stock.js");
const { verifyUser } = require("./utils/token.js");

const router = express.Router();

router.use("/", authRoutes);
router.use("/", productsRoutes);
router.use("/", verifyUser, inwardRoutes);
router.use("/", verifyUser, stockRoutes);
router.use("/", cartRoutes);

module.exports = router;
