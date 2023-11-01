import { Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.model";

import dotenv from "dotenv";
dotenv.config();

interface DecodedToken extends JwtPayload {
  userId: number;
}

export async function getUserInfo(req: Request) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("No access token provided.");
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        algorithms: ["HS256"],
        ignoreExpiration: false,
      }
    ) as DecodedToken;

    const userInfo = await User.findOne({ where: { id: decodedToken.userId } });
    if (!userInfo) {
      throw new Error("User not found.");
    }

    return {
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    };
  } catch (error) {
    throw new Error("Invalid access token.");
  }
}
