import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.get("/:id", productController.getProductById);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteProductById);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/supplier/:supplier", productController.getProductsBySupplier);
router.get(
  "/serialNumber/:serialNumber",
  productController.getProductBySerialNumber
);
router.get("/sort/location", productController.sortProductsByLocation);
router.get("/sort/quantity", productController.sortProductsByQuantity);
router.get("/sort/price", productController.sortProductsByPrice);
router.get(
  "/sort/reorderThreshold",
  productController.sortProductsByReorderThreshold
);

export default router;
