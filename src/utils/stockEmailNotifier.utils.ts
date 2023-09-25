import Product from "../models/Product.model";
import { sendEmail } from "../emails/email";

const previousStockState: Record<string, number> = {};

export async function checkStockAndSendEmail() {
  const products = await Product.findAll();

  for (const product of products) {
    const productId = product.id;
    const quantity = product.quantity;

    if (quantity === 0 && !previousStockState[productId]) {
      previousStockState[productId] = 0;
    } else if (quantity >= 5 && previousStockState[productId] === 0) {
      const recipientEmail = "onboarding@resend.dev";
      sendEmail(recipientEmail, product.name);
      previousStockState[productId] = quantity;
    } else {
      previousStockState[productId] = quantity;
    }
  }
}
