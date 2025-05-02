const express = require("express");
const { getUsersV2 } = require("../controllers/usersController.js");

const router = express.Router();

router.get("/", getUsersV2);

module.exports = router;
