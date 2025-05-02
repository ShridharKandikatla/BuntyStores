const Joi = require("joi");
const { verifyToken } = require("../../utils/token");

const createUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  contact: Joi.string().required(),
  role: Joi.string().valid("USER", "ADMIN").default("USER").required(),
});

const updateUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  contact: Joi.string().required(),
});

const createUserValidation = async (req, res, next) => {
  const { error } = createUser.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const updateUserValidation = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req.headers.authorization.split(" ")[1]);
    req.userId = decoded.id;
    req.role = decoded.role;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { error } = updateUser.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginValidation = (req, res, next) => {
  const { error } = login.validate(req.body || {});
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
};
