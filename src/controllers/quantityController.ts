import Product from "../models/Product.model";

export async function updateQuantity(id: string, quantity: number) {
  const product = await Product.findByPk(id);
  if (product) {
    product.quantity = quantity;
    await product.save();
  }
}
