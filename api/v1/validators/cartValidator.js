const Joi = require("joi");
const { verifyToken } = require("../../utils/token");

const addToCartSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().required(),
});

const addToCartValidation = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req.headers.authorization.split(" ")[1]);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { error } = addToCartSchema.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  addToCartValidation,
};
