const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getProduct,
} = require("../controllers/productsController");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validators/productValidator");

const router = express.Router();

router.post("/product", createProductValidation, createProduct);
router.get("/product", getProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProductValidation, updateProduct);

module.exports = router;
