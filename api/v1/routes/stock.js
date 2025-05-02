const express = require("express");
const { getAllStocks } = require("../controllers/stockController");

const router = express.Router();

router.get("/getAllStocks", getAllStocks);

module.exports = router;
