const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getProduct,
} = require("../controllers/productsController");
const {
  idSchemaValidation,
  productValidation,
} = require("../validators/productValidator");

const router = express.Router();

router.post("/product", productValidation, createProduct);
router.get("/product", getProduct);
router.get("/products", getAllProducts);
router.get("/product/:id", idSchemaValidation, getProductById);
router.put(
  "/product/:id",
  idSchemaValidation,
  productValidation,
  updateProduct
);

module.exports = router;
