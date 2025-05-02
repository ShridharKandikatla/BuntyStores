const prisma = require("../../prisma");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    const userId = req.userId;

    const user = await prisma.register.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = await prisma.cart.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      update: {
        quantity,
        price,
      },
      create: {
        userId,
        productId,
        quantity,
        price,
      },
    });

    return res
      .status(200)
      .json({ message: "Product added to cart successfully", cartItem });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addToCart,
};
