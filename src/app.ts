import express, { Request, Response } from "express";
import { dbConnect } from "./database/db";
import listTables from "./database/tableManager";
import Products from "./routes/products.route";
import EmailSubscription from "./routes/EmailSubscription.route";
import login from "./routes/login.route";
import register from "./routes/register.route";
import { authenticateToken } from "./middleware/auth";
import { getUserInfo } from "./controllers/userController";
import { updateQuantity } from "./controllers/quantityController";

dbConnect();
listTables();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("it's alive 🧟‍♂️");
});

app.use("/products", Products);

app.post("/register", register);
app.post("/login", login);

app.get("/user", authenticateToken, getUserInfo);

app.post("/quantity/:id/:quantity", (req: Request, res: Response) => {
  const { id, quantity } = req.params;
  updateQuantity(id, parseInt(quantity));
  res.send("Quantity updated successfully");
});

app.use("/email-subscription", EmailSubscription);

module.exports = app;
