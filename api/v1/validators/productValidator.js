const Joi = require("joi");
const { verifyToken } = require("../../utils/token");

const productSchema = Joi.object({
  cid: Joi.string().required(),
  name: Joi.string().required(),
  mrp: Joi.string().required(),
  image: Joi.string().required(),
  shortDesc: Joi.string().required(),
  fullDesc: Joi.string().required(),
  ratings: Joi.string(),
  purchaseRateWoGst: Joi.string().required(),
  purchaseRateWGst: Joi.string().required(),
  salingRateWoGst: Joi.string().required(),
  sellingRateWGst: Joi.string().required(),
  discount: Joi.string().required(),
  gst: Joi.string().required(),
  profit: Joi.string(),
  points: Joi.string().required(),
  gram: Joi.string().required(),
  weight: Joi.number().required(),
  status: Joi.string()
    // .valid("active", "inactive", "pending", "discontinued")
    .required(), // Adjust values as per your use case
  productSrno: Joi.number().default(0),
});

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const idSchemaValidation = async (req, res, next) => {
  const { error } = idSchema.validate(req.params || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}

const productValidation = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req.headers.authorization.split(" ")[1]);
    req.userId = decoded.id;
    req.role = decoded.role;
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { error } = productSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  productValidation,
  idSchemaValidation,
};
