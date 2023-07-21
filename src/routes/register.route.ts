import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { UserAttributes } from "../models/User.model";

const router = express.Router();

router.use(express.json());

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    } as UserAttributes);

    return res
      .status(201)
      .json({ message: "Utilisateur enregistré avec succès.", user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur :", error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de l'enregistrement de l'utilisateur.",
    });
  }
});

export default router;
