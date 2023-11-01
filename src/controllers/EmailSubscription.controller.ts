import { Request, Response } from "express";
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

export async function createEmailSubscription(req: Request, res: Response) {
  const { email, productId } = req.body;
  try {
    if (await checkSubscriptionExists(email, productId)) {
      throw new Error("Subscription already exists");
    }
    const emailSubscription = await EmailSubscription.create({
      email,
      product_id: productId,
    } as EmailSubscriptionAttributes);
    res.json(emailSubscription);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while creating the email subscription.",
      });
  }
}
