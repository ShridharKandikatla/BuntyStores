const Joi = require("joi");

const inwardSchema = Joi.object({
  qty: Joi.number().integer().required(),
  price: Joi.string(),
  mrp: Joi.string(),
  purchaseWithGst: Joi.string(),
  purchaseWithoutGst: Joi.string(),
  gst: Joi.string(),
  productId: Joi.number().integer().required(),
}).strict();

const InwardValidation = async (req, res, next) => {
  const { error } = inwardSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  InwardValidation,
};
