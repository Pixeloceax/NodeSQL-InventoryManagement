import Product, { ProductAttributes } from "../models/Product";

export async function getAllProducts() {
  const products = await Product.findAll();
  return products;
}

export async function addProduct(name: string, price: number) {
  try {
    const newProduct = await Product.create({
      name,
      price,
    } as ProductAttributes);
    return newProduct;
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    throw error;
  }
}
