import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.model";

interface DecodedToken extends JwtPayload {
  userId: number;
}

export async function getUserInfo(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Aucun jeton d'accès fourni." });
  }

  try {
    const decodedToken = jwt.verify(token, "Y-S-K", {
      algorithms: ["HS256"],
      ignoreExpiration: false,
    }) as DecodedToken;

    const userInfo = await User.findOne({ where: { id: decodedToken.userId } });
    if (!userInfo) {
      return res.status(404).json({ error: "Utilisateur introuvable." });
    }

    return res.json({
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
    });
  } catch (error) {
    return res.status(403).json({ error: "Jeton d'accès non valide." });
  }
}
