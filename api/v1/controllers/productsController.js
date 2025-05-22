const prisma = require("../../prisma");

const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {...req.body, userId: req.userId},
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  let { page, pageSize, status } = req.query;
  try {
    const products = await prisma.product.findMany({
      where:{
        status,
      },
      orderBy: { name: "asc" },
      skip: parseInt((page - 1) * pageSize) || 0,
      take: parseInt(pageSize) || 10,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {...req.body, userId: req.userId},
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  const { search, page, pageSize } = req.query;
  try {
    const products = await prisma.product.findMany({
      where: {
        OR: [{ name: { contains: search } }],
      },
      orderBy: { name: "asc" },
      skip: parseInt((page - 1) * pageSize) || 0,
      take: parseInt(pageSize) || 10,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getProduct,
};
