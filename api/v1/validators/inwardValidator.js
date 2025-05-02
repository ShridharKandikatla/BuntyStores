const Joi = require("joi");

const inwardSchema = {
  qty: Joi.number().integer().required(),
  price: Joi.string(),
  mrp: Joi.string(),
  purchaseWithGst: Joi.string(),
  purchaseWithoutGst: Joi.string(),
  gst: Joi.string(),
  productId: Joi.number().integer().required(),
};

const addInwardSchema = Joi.object({ ...inwardSchema }).strict();
const updateInwardSchema = Joi.object({
  ...inwardSchema,
  id: Joi.number().integer().required(),
}).strict();
const deleteInwardSchema = Joi.object({
  id: Joi.number().integer().required(),
}).strict();

const addInwardValidation = async (req, res, next) => {
  const { error } = addInwardSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const updateInwardValidation = async (req, res, next) => {
  const { error } = updateInwardSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const deleteInwardValidation = async (req, res, next) => {
  const { error } = deleteInwardSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  addInwardValidation,
  updateInwardValidation,
  deleteInwardValidation,
};
