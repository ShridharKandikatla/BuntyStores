const express = require("express");
const { addToCart } = require("../controllers/cartController");
const { addToCartValidation } = require("../validators/cartValidator");

const router = express.Router();

router.post("/add-to-cart", addToCartValidation, addToCart);

module.exports = router;
