import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
} from "../controllers/productController";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
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
    const newProduct = await addProduct(
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
      notes
    );
    res.json(newProduct);
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout du produit.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du produit.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
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
    const updatedProduct = await updateProductById(
      req.params.id,
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
      notes
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du produit.",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await deleteProductById(req.params.id);
    res.json(deletedProduct);
  } catch (error) {
    console.error("Erreur lors de la suppression du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du produit.",
    });
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const products = await getProductsByCategory(req.params.category);
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

export default router;
