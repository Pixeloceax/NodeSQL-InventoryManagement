import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model";

const router = express.Router();

router.use(express.json());

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const accessToken = jwt.sign({ userId: user.id }, "Y-S-K");

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur :", error);
    return res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la connexion." });
  }
});

export default router;
