const prisma = require("../../prisma");

// inward can have multiple products with entries, but stocks product must be unique and overall addition of quantity
const getAllStocks = async (req, res) => {
  let { page, pageSize } = req.query;
  try {
    const stocks = await prisma.$queryRaw.groupBy({
      by: ["productId"],
      _sum: {
        qty: true,
      },
      where: { userId: req.userId },
    });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllStocks,
};
