const express = require("express");
const { InwardValidation } = require("../validators/inwardValidator");
const {
  addInward,
  updateInward,
  deleteInward,
  getInwardById,
  getAllInwards,
} = require("../controllers/inwardController");

const router = express.Router();

router.post("/addInward", InwardValidation, addInward);
router.post("/updateInward/:id", InwardValidation, updateInward);
router.post("/deleteInward/:id", deleteInward);
router.get("/getInwardById/:id", getInwardById);
router.get("/getAllInwards", getAllInwards);

module.exports = router;
