import Product, { ProductAttributes } from "../models/Product.model";

export async function getAllProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new Error("Error while retrieving products: " + error);
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
    throw new Error("Error while adding the product: " + error);
  }
}

export async function getProductById(id: string) {
  try {
    const product = await Product.findByPk(id);
    return product;
  } catch (error) {
    throw new Error("Error while retrieving the product: " + error);
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
      throw new Error("Product not found");
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
    throw new Error("Error while updating the product: " + error);
  }
}

export async function deleteProductById(id: string) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await product.destroy();
  } catch (error) {
    throw new Error("Error while deleting the product: " + error);
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
    throw new Error("Error while retrieving products: " + error);
  }
}

export async function getProductsBySupplier(supplier: string) {
  try {
    const products = await Product.findAll({
      where: {
        supplier,
      },
    });
    return products;
  } catch (error) {
    throw new Error("Error while retrieving products by supplier: " + error);
  }
}

export async function getProductBySerialNumber(serialNumber: string) {
  try {
    const product = await Product.findOne({
      where: {
        serialNumber,
      },
    });
    return product;
  } catch (error) {
    throw new Error(
      "Error while retrieving the product by serial number: " + error
    );
  }
}

export async function sortProductsByPrice() {
  try {
    const products = await Product.findAll({
      order: [["price", "ASC"]],
    });
    return products;
  } catch (error) {
    throw new Error("Error while sorting products by price: " + error);
  }
}

export async function sortProductsByQuantity() {
  try {
    const products = await Product.findAll({
      order: [["quantity", "DESC"]],
    });
    return products;
  } catch (error) {
    throw new Error("Error while sorting products by quantity: " + error);
  }
}

export async function sortProductsByReorderThreshold() {
  try {
    const products = await Product.findAll({
      order: [["reorderThreshold", "ASC"]],
    });
    return products;
  } catch (error) {
    throw new Error(
      "Error while sorting products by reorder threshold: " + error
    );
  }
}

export async function sortProductsByLocation() {
  try {
    const products = await Product.findAll({
      order: [["location", "ASC"]],
    });
    return products;
  } catch (error) {
    throw new Error("Error while sorting products by location: " + error);
  }
}
