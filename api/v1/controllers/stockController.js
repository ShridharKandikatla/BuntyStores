const prisma = require("../../prisma");

// inward can have multiple products with entries, but stocks product must be unique and overall addition of quantity
const getAllStocks = async (req, res) => {
  let { page = 1, pageSize = 10 } = req.query;
  page = parseInt(page);
  pageSize = parseInt(pageSize);
  const offset = (page - 1) * pageSize;
  try {
    const stocks = await prisma.$queryRaw`
  SELECT 
    p.id AS "productId",
    p.name AS "name",
    p.mrp AS "price",
    SUM(i.qty) AS "qty"
  FROM 
    "inwards" i
  JOIN 
    "products" p ON p.id = i."productId"
  GROUP BY 
    p.id, p.name
  ORDER BY 
    qty DESC 
     LIMIT ${pageSize}
  OFFSET ${offset};
`;
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllStocks,
};
