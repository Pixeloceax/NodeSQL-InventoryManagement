import express from "express";
import * as emailSubscriptionController from "../controllers/EmailSubscription.controller";
const router = express.Router();

router.post("/", emailSubscriptionController.createEmailSubscription);

export default router;
