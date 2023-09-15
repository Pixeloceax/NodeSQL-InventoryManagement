import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductsByCategory,
  getProductsBySupplier,
  getProductBySerialNumber,
  sortProductsByLocation,
  sortProductsByQuantity,
  sortProductsByPrice,
  sortProductsByReorderThreshold,
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

router.get("/supplier/:supplier", async (req, res) => {
  try {
    const products = await getProductsBySupplier(req.params.supplier);
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.get("/serialNumber/:serialNumber", async (req, res) => {
  try {
    const product = await getProductBySerialNumber(req.params.serialNumber);
    res.json(product);
  } catch (error) {
    console.error("Erreur lors de la récupération du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du produit.",
    });
  }
});

router.get("/sort/location", async (req, res) => {
  try {
    const products = await sortProductsByLocation();
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.get("/sort/quantity", async (req, res) => {
  try {
    const products = await sortProductsByQuantity();
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.get("/sort/price", async (req, res) => {
  try {
    const products = await sortProductsByPrice();
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.get("/sort/reorderThreshold", async (req, res) => {
  try {
    const products = await sortProductsByReorderThreshold();
    res.json(products);
  } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

export default router;
