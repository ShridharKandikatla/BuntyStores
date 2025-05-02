const prisma = require("../../prisma");
const { hashPassword, comparePassword } = require("../../utils/hashpassword");
const { generateToken } = require("../../utils/token");

const createUser = async (req, res) => {
  const { name, email, password, contact, role } = req.body;
  let hashedPassword;
  try {
    hashedPassword = await hashPassword(password);
  } catch (error) {
    return res.json({ error: "Error hashing password" });
  }

  try {
    const activeUsers = await prisma.register.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        contact: contact,
        role: role,
      },
    });

    res.json(activeUsers);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "User already exists" });
    }
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.register.findUnique({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).json({ error: "Invalid email" });
    }
    const { password: Hashpassword, ...userWithoutPassword } = user;
    const isPasswordValid = await comparePassword(password, Hashpassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = generateToken(user);
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req;
  const { name, email, contact } = req.body;

  try {
    const updatedUser = await prisma.register.update({
      where: { id: parseInt(userId) },
      data: {
        name: name,
        email: email,
        contact: contact,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "User already exists" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  login,
  updateUser,
};
