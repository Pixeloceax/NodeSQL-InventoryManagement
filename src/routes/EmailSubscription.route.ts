import express from "express";
import { createEmailSubscription } from "../controllers/EmailSubscriptionController";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, productId } = req.body;
  const emailSubscription = await createEmailSubscription(email, productId);
  res.json(emailSubscription);
});

export default router;
