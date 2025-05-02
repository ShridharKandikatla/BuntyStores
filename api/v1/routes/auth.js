const express = require("express");
const {
  createUser,
  login,
  updateUser,
} = require("../controllers/authController.js");
const {
  createUserValidation,
  loginValidation,
  updateUserValidation,
} = require("../validators/authValidator.js");

const router = express.Router();

router.post("/signup", createUserValidation, createUser);
router.post("/login", loginValidation, login);
router.put("/update", updateUserValidation, updateUser);

module.exports = router;
