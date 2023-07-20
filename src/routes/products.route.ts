import express from "express";
import { addProduct, getAllProducts } from "../controllers/productController";

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des produits.",
    });
  }
});

router.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const newProduct = await addProduct(name, price);
    res.json(newProduct);
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout du produit.",
    });
  }
});

export default router;
