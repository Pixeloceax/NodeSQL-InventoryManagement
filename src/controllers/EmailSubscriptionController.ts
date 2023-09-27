import { json } from "sequelize";
import EmailSubscription, {
  EmailSubscriptionAttributes,
} from "../models/EmailSubscription.model";

async function checkSubscriptionExists(
  email: string,
  productId: number
): Promise<boolean> {
  const emailSubscription = await EmailSubscription.findOne({
    where: {
      email,
      product_id: productId,
    },
  });
  return !!emailSubscription;
}

export async function createEmailSubscription(
  email: string,
  productId: number
) {
  try {
    if (await checkSubscriptionExists(email, productId)) {
      return json({ message: "Subscription already exists" });
    }
    const emailSubscription = await EmailSubscription.create({
      email,
      product_id: productId,
    } as EmailSubscriptionAttributes);
    return emailSubscription;
  } catch (error) {
    throw error;
  }
}
