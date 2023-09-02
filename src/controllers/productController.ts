import Product, { ProductAttributes } from "../models/Product.model";

export async function getAllProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
}

export async function addProduct(
  name: string,
  price: number,
  description: string,
  category: string,
  quantity: number,
  supplier: string,
  reorderThreshold: number,
  location: string,
  taxRate: number,
  serialNumber?: string,
  image?: string,
  notes?: string
) {
  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      category,
      quantity,
      supplier,
      reorderThreshold,
      location,
      serialNumber,
      image,
      notes,
      taxRate,
    } as ProductAttributes);
    return newProduct;
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    throw error;
  }
}

export async function updateProductById(
  id: string,
  name: string,
  price: number,
  description: string,
  category: string,
  quantity: number,
  supplier: string,
  reorderThreshold: number,
  location: string,
  taxRate: number,
  serialNumber?: string,
  image?: string,
  notes?: string
) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Produit introuvable");
    }
    await product.update({
      name,
      price,
      description,
      category,
      quantity,
      supplier,
      reorderThreshold,
      location,
      serialNumber,
      image,
      notes,
      taxRate,
    } as ProductAttributes);
    return product;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    throw error;
  }
}

export async function deleteProductById(id: string) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Produit introuvable");
    }
    await product.destroy();
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    throw error;
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const products = await Product.findAll({
      where: {
        category,
      },
    });
    return products;
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    throw error;
  }
}

// get by supplier
// get by serialNumber

// sort by price
// sort by quantity
// sort by reorderThreshold
// sort by location

// combine sort
