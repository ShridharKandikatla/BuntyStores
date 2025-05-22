const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_EXPIRY } = process.env;

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRY,
  });
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
};

const verifyAdmin = async (req, res, next) => {
  try {
    const decoded = await verifyToken(req.headers.authorization.split(" ")[1]);
    req.userId = decoded.id;
    req.role = decoded.role;
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  verifyAdmin,
};
