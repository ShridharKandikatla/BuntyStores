const bcrypt = require("bcrypt");
const saltRounds = Number(process.env.SALT_ROUNDS);

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (err) {
    throw err;
  }
};
  
const comparePassword = async (password, hash) => {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

module.exports = { hashPassword, comparePassword };
