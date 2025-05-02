const prisma = require("../../prisma");

const addInward = async (req, res) => {
  const inwards = await prisma.inward.create({
    data: { ...req.body, userId: req.userId },
  });
  res.status(201).json(inwards);
  try {
  } catch (error) {
    console.error("Error adding inward:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateInward = async (req, res) => {
  const { id } = req.body;
  const inward = await prisma.inward.update({
    where: { id },
    data: { ...req.body, userId: req.userId },
  });
  res.status(200).json(inward);
  try {
  } catch (error) {
    console.error("Error updating inward:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteInward = async (req, res) => {
  const { id } = req.body;
  await prisma.inward.delete({
    where: { id },
  });
  res.status(200).json({ message: "Inward deleted successfully" });
  try {
  } catch (error) {
    console.error("Error deleting inward:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getInwardById = async (req, res) => {
  const { id } = req.body;
  const inward = await prisma.inward.findUnique({
    where: { id },
  });
  res.status(200).json(inward);
  try {
  } catch (error) {
    console.error("Error fetching inward:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllInwards = async (req, res) => {
  let { page, pageSize } = req.query;
  const inwards = await prisma.inward.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: "desc" },
    skip: parseInt((page - 1) * pageSize) || 0,
    take: parseInt(pageSize) || 10,
  });
  res.status(200).json(inwards);
  try {
  } catch (error) {
    console.error("Error fetching inwards:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addInward,
  updateInward,
  deleteInward,
  getInwardById,
  getAllInwards,
};
