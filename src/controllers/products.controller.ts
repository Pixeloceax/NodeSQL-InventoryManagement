import Product, { ProductAttributes } from "../models/Product.model";
import { Request, Response } from "express";

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching products." });
  }
}

export async function addProduct(req: Request, res: Response) {
  const {
    name,
    price,
    description,
    category,
    quantity,
    supplier,
    reorderThreshold,
    location,
    taxRate,
    serialNumber,
    image,
    notes,
  } = req.body;

  try {
    const existingProduct = await Product.findOne({ where: { name: name } });

    if (existingProduct) {
      res.status(409).json({ message: "Product already exists" });
      return;
    }

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

    if (!newProduct) {
      throw new Error("Error while creating the product");
    }

    res.json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the product." });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching the product." });
  }
}

export async function updateProductById(req: Request, res: Response) {
  const {
    name,
    price,
    description,
    category,
    quantity,
    supplier,
    reorderThreshold,
    location,
    taxRate,
    serialNumber,
    image,
    notes,
  } = req.body;

  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
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

    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while updating the product: " + error });
  }
}

export async function deleteProductById(req: Request, res: Response) {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    await product.destroy();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting the product: " + error });
  }
}

export async function getProductsByCategory(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      where: {
        category: req.params.category,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving products by category: " + error,
    });
  }
}

export async function getProductsBySupplier(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      where: {
        supplier: req.params.supplier,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving products by supplier: " + error,
    });
  }
}

export async function getProductBySerialNumber(req: Request, res: Response) {
  try {
    const product = await Product.findOne({
      where: {
        serialNumber: req.params.serialNumber,
      },
    });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error while retrieving product by serial number: " + error,
    });
  }
}

export async function sortProductsByPrice(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      order: [["price", "ASC"]],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while sorting products by price: " + error });
  }
}

export async function sortProductsByQuantity(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      order: [["quantity", "DESC"]],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while sorting products by quantity: " + error });
  }
}

export async function sortProductsByReorderThreshold(
  req: Request,
  res: Response
) {
  try {
    const products = await Product.findAll({
      order: [["reorderThreshold", "ASC"]],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Error while sorting products by reorder threshold: " + error,
    });
  }
}

export async function sortProductsByLocation(req: Request, res: Response) {
  try {
    const products = await Product.findAll({
      order: [["location", "ASC"]],
    });
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while sorting products by location: " + error });
  }
}
