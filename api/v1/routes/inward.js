const express = require("express");
const {
  addInwardValidation,
  updateInwardValidation,
  deleteInwardValidation,
} = require("../validators/inwardValidator");
const {
  addInward,
  updateInward,
  deleteInward,
  getInwardById,
  getAllInwards,
} = require("../controllers/inwardController");

const router = express.Router();

router.post("/addInward", addInwardValidation, addInward);
router.post("/updateInward", updateInwardValidation, updateInward);
router.post("/deleteInward", deleteInwardValidation, deleteInward);
router.get("/getInwardById", deleteInwardValidation, getInwardById);
router.get("/getAllInwards", getAllInwards);

module.exports = router;
