import { Request, Response } from "express";
import Product from "../models/Product.model";

export async function updateQuantity(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.quantity = parseInt(req.params.quantity);
      await product.save();
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "An error occurred while updating the product quantity",
      });
  }
}
