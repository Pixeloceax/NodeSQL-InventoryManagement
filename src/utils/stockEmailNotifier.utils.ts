import Product from "../models/Product.model";
import { sendEmail } from "../emails/email";
import EmailSubscription from "../models/EmailSubscription.model";

export async function getActiveSubscribers() {
  try {
    const subscribers = await EmailSubscription.findAll({
      where: {
        isActivated: true,
      },
    });
    return subscribers;
  } catch (error) {
    throw error;
  }
}

const previousStockState: Record<string, number> = {};

export async function checkStockAndSendEmail() {
  const products = await Product.findAll();

  for (const product of products) {
    const productId = product.id;
    const quantity = product.quantity;

    if (quantity === 0 && !previousStockState[productId]) {
      console.log("No stock");
      previousStockState[productId] = 0;
    } else if (quantity >= 5 && previousStockState[productId] === 0) {
      const subscribers = await getActiveSubscribers();
      const recipientEmails = subscribers.map((subscriber) => subscriber.email);
      for (const subscriberEmail of recipientEmails) {
        sendEmail(subscriberEmail, product.name);
        await EmailSubscription.update(
          { isActivated: false },
          { where: { email: subscriberEmail } }
        );
      }
      previousStockState[productId] = quantity;
    } else {
      previousStockState[productId] = quantity;
    }
  }
}
